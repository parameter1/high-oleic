const { ApolloError } = require('apollo-server-express');
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

  async check() {
    await this.load();
    if (this.didError()) throw AuthContext.error(this.error.message);
    if (!this.hasUser()) throw AuthContext.error('You must be authenticated to access this resource.');
    return true;
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
}

module.exports = AuthContext;
