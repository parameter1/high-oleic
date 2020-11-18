const { ApolloError } = require('apollo-server-express');
const { get } = require('@parameter1/utils');
const UserContext = require('./user');

class AuthContext {
  constructor({ header, idx } = {}) {
    this.header = header;
    this.user = new UserContext();
    this.idx = idx;
  }

  async load() {
    const load = async () => {
      const { value: token } = this.parseHeader();
      if (!token) throw new Error('No authentication token was provided with the request.');
      const user = await this.idx.getCurrentUser({ token });
      this.user.set(user);
    };
    if (!this.promise) this.promise = load();
    try {
      await this.promise;
    } catch (e) {
      this.error = e;
    }
  }

  /**
   *
   */
  async check() {
    await this.load();
    if (this.didError()) throw AuthContext.error(this.error.message);
    if (!this.hasUser()) throw AuthContext.error('You must be authenticated to access this resource.');
    return true;
  }

  /**
   *
   */
  async checkCan(action, params = {}) {
    const email = this.user.get('email');
    if (!action) throw new Error('Unable to authorize: no action was provided.');

    const checkParam = (path) => {
      if (!get(params, path)) throw new Error(`Unable to authorize: no '${path}' was provided.`);
    };

    const checkCreatedBy = () => {
      checkParam('createdByEmail');
      if (params.createdByEmail === email) return true;
      throw AuthContext.forbidden();
    };

    switch (action) {
      case 'crop-comparison:set-acres':
        return checkCreatedBy();
      case 'crop-comparison:set-crop-to-compare':
        return checkCreatedBy();
      case 'crop-comparison:set-data':
        return checkCreatedBy();
      case 'crop-comparison:set-expenses':
        return checkCreatedBy();
      case 'crop-comparison:set-farm-name':
        return checkCreatedBy();
      default:
        throw new Error(`Unable to find an authorization action for '${action}'`);
    }
  }

  /**
   *
   */
  getUserId() {
    return this.user.get('id');
  }

  /**
   *
   */
  hasUser() {
    return Boolean(this.getUserId());
  }

  /**
   *
   */
  didError() {
    return Boolean(this.error);
  }

  /**
   *
   */
  parseHeader() {
    const { header } = this;
    if (!header) return {};
    const [type, value] = header.trim().replace(/\s\s+/, ' ').split(' ');
    return { type, value };
  }

  /**
   *
   */
  static error(message, statusCode = 401) {
    const e = new ApolloError(message);
    e.statusCode = statusCode;
    return e;
  }

  static forbidden() {
    return AuthContext.error('You do not have the proper permissions to perform this operation.', 403);
  }
}

module.exports = AuthContext;
