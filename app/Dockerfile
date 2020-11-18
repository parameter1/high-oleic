FROM node:14.13-alpine
WORKDIR /oleic
ADD package.json yarn.lock /oleic/
ADD app /oleic/app
RUN yarn --pure-lockfile
WORKDIR /oleic/app
RUN yarn build
ENV NODE_ENV production
ENTRYPOINT [ "yarn", "start", "--port", "80", "--hostname", "0.0.0.0"]
