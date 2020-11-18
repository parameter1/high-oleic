#!/usr/bin/env node
/* eslint-disable import/no-dynamic-require */

const { existsSync } = require('fs');
const { join } = require('path');
const { spawnSync: spawn } = require('child_process');
// eslint-disable-next-line no-use-before-define

const { TRAVIS_TAG } = process.env;
const AWS_ECR_REGISTRY = process.env.AWS_ECR_REGISTRY || '598984531759.dkr.ecr.us-east-2.amazonaws.com';
const { argv } = process;
const service = argv[2];
const namespace = argv[3];
const workspace = join('.', service);
const notifyEnv = { ...process.env, TRAVIS_REPO_SLUG: `${process.env.TRAVIS_REPO_SLUG}-${service}` };
const repository = process.env.AWS_ECR_REPOSITORY || `high-oleic-${service}`;
const useLerna = existsSync(join(process.cwd(), 'lerna.json'));
const lerna = useLerna ? require(join(process.cwd(), 'lerna.json')) : { version: TRAVIS_TAG };
const { log } = console;
const version = `v${lerna.version}`;
const imageTag = `${repository}:${version}`;

const spawnSync = (cmd, args, options) => spawn(cmd, args, options);

const failed = () => spawnSync('npx', ['@base-cms/website-deployment-tool', 'notify-failed'], { stdio: 'inherit', env: notifyEnv });

const error = async (message, context = {}) => {
  log(`ERROR: ${message}`, context);
  await failed();
  process.exit(1);
};

if (TRAVIS_TAG !== version) error(`Tagged version ${TRAVIS_TAG} differs from lerna version ${version}, aborting!`);
if (!service) error('You must specify the service folder to deploy.');
if (!existsSync(workspace)) error(`Could not read ${workspace}!`);

const pkg = require(`../${workspace}/package.json`);
if (version !== `v${pkg.version}`) {
  log(`Service ${service} is at version ${pkg.version}. Skipping deployment.`);
  process.exit(0);
}

const docker = async (args = [], opts = { stdio: 'inherit' }) => {
  const out = await spawnSync('docker', args, opts);
  const { status, stderr } = out;
  if (status !== 0) {
    const err = stderr || out.stdout || 'Unknown error';
    error('Docker command failed!', await err.toString());
  }
  return out;
};

const aws = async (args) => docker([
  'run',
  '-e',
  `AWS_ACCESS_KEY_ID=${process.env.AWS_ACCESS_KEY_ID}`,
  '-e',
  `AWS_SECRET_ACCESS_KEY=${process.env.AWS_SECRET_ACCESS_KEY}`,
  'amazon/aws-cli',
  ...args,
], {});

const getVersions = async () => {
  try {
    const { stdout } = await aws(['ecr', 'describe-images', '--repository-name', repository, '--output', 'json', '--region', 'us-east-2']);
    const body = await stdout.toString();
    const { imageDetails } = JSON.parse(body);
    const items = Array.isArray(imageDetails) ? imageDetails : [];
    return items.reduce((arr, obj) => ([...arr, ...obj.imageTags]), []);
  } catch (e) {
    return [];
  }
};

const shouldBuild = async () => {
  log(`\nChecking  ${imageTag} on ECR`);
  const versions = await getVersions();
  return !versions.includes(version);
};

const build = async () => {
  log(`Building  ${imageTag}...\n`);
  const Dockerfile = join(workspace, 'Dockerfile');
  const file = existsSync(Dockerfile) ? ['-f', Dockerfile] : [];
  const { stdout } = await aws(['ecr', 'get-login-password', '--region', 'us-east-2']);
  const password = await stdout.toString();
  await docker(['login', '-u', 'AWS', '-p', password, `https://${AWS_ECR_REGISTRY}`]);
  await docker(['build', '-t', imageTag, ...file, process.cwd()]);
  await docker(['tag', imageTag, `${AWS_ECR_REGISTRY}/${imageTag}`]);
  await docker(['push', `${AWS_ECR_REGISTRY}/${imageTag}`]);
  await docker(['image', 'rm', imageTag]);
};

const deploy = async ({ key, value, image }) => {
  log(`Deploying ${imageTag} on Kubernertes`);
  const { status, stderr } = await spawnSync('npx', ['@endeavorb2b/rancher2cli', 'dl', key, value, image, namespace]);
  if (status !== 0) {
    const err = await stderr.toString();
    error('Image deployment failed!', err);
  }
};

const main = async () => { // eslint-disable-line consistent-return
  const keys = [
    'AWS_ACCESS_KEY_ID',
    'AWS_SECRET_ACCESS_KEY',
    'RANCHER_CLUSTERID',
    'RANCHER_TOKEN',
    'RANCHER_URL',
    'TRAVIS_REPO_SLUG',
    'TRAVIS_TAG',
    'ENVIRONMENT',
    'SLACK_WEBHOOK_URL',
  ];
  if (!keys.every((k) => process.env[k])) return error('Deployment aborted: a mandatory environment variable is missing.');

  if (await shouldBuild()) {
    log('Image was not found, building.');
    await build();
    log('Build complete.');
  } else {
    log('Image found, skipping build.');
  }

  await deploy({
    key: 'high-oleic-service',
    value: service,
    image: `${AWS_ECR_REGISTRY}/${repository}:${version}`,
    namespace,
  });
  log('  Deploy complete.\n');
};

main().catch(error);
