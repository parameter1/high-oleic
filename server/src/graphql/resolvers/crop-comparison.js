module.exports = {
  /**
   *
   */
  CropComparison: {
    /**
     *
     */
    oleic({ oleic, acres }) {
      return { ...oleic, acres };
    },

    /**
     *
     */
    comparedTo({ comparedTo, acres }) {
      return { ...comparedTo, acres };
    },
  },

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
