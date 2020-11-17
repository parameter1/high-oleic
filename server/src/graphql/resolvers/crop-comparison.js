module.exports = {
  /**
   *
   */
  Mutation: {
    /**
     *
     */
    async createCropComparison(_, { input }, { auth, repos }) {
      await auth.check();
      const email = auth.user.get('email');
      return repos.cropComparison.create({
        ...input,
        email,
      });
    },
  },
};
