module.exports = {
  /**
   *
   */
  UserAttributionInterface: {
    /**
     *
     */
    createdBy({ createdByEmail }, _, { idx }) {
      return idx.getUser({ email: createdByEmail });
    },
  },
};
