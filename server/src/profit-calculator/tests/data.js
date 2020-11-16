const corn = {
  acres: 800,
  yieldPerAcre: 200,
  pricePerBushel: 3.6,
  premiumPerBushel: 0,
};

const soy = {
  acres: 800,
  yieldPerAcre: 60,
  pricePerBushel: 9,
  premiumPerBushel: 0,
};

const oleic = {
  acres: 800,
  yieldPerAcre: 60,
  pricePerBushel: 9.8,
  premiumPerBushel: 0,
};

module.exports = {
  /**
   *
   */
  corn: {
    ...corn,
    cropType: 'corn',
    totalBushels: corn.acres * corn.yieldPerAcre,
    revenuePerBushel: corn.pricePerBushel + corn.premiumPerBushel,
    income: {
      govtPayment: 0, // total dollars (is then calculated by $ / acre)
      other: 0, // total dollars (is then calculated by $ / acre)
    },
    expenses: {
      /**
       * Crop Expenses, in $ cost / acre.
       */
      crop: {
        land: 215,
        int: 10.55,
        ins: 19,
        seeds: 103,
        fertLime: 55.2,
        nitro: 85,
        chem: 34,
      },

      /**
       * Grain Handling Expenses, in $ cost / bushel.
       */
      handling: {
        hauling: 0.24,
        dryer: 0.11,
      },

      /**
       * Field Operation Costs, in $ cost / acre.
       */
      fieldOps: {
        nitro: 14.56,
        cult: 15.22,
        planter: 24.88,
        sprayer: 14,
        combine: 56.79,
      },
    },
  },

  /**
   *
   */
  soy: {
    ...soy,
    cropType: 'soy',
    totalBushels: soy.acres * soy.yieldPerAcre,
    revenuePerBushel: soy.pricePerBushel + soy.premiumPerBushel,
    income: {
      govtPayment: 0, // total dollars (is then calculated by $ / acre)
      other: 0, // total dollars (is then calculated by $ / acre)
    },
    expenses: {
      /**
       * Crop Expenses, in $ cost / acre.
       */
      crop: {
        land: 215,
        int: 7.22,
        ins: 22,
        seeds: 85,
        fertLime: 40,
        chem: 32,
      },

      /**
       * Grain Handling Expenses, in $ cost / bushel.
       */
      handling: {
        hauling: 0.24,
      },

      /**
       * Field Operation Costs, in $ cost / acre.
       */
      fieldOps: {
        planter: 22.31,
        sprayer: 21,
        combine: 53.75,
      },
    },
  },

  /**
   *
   */
  oleic: {
    ...oleic,
    cropType: 'oleic',
    totalBushels: oleic.acres * oleic.yieldPerAcre,
    revenuePerBushel: oleic.pricePerBushel + oleic.premiumPerBushel,
    income: {
      govtPayment: 0, // total dollars (is then calculated by $ / acre)
      other: 0, // total dollars (is then calculated by $ / acre)
    },
    expenses: {
      /**
       * Crop Expenses, in $ cost / acre.
       */
      crop: {
        land: 215,
        int: 7.22,
        ins: 22,
        seeds: 85,
        fertLime: 40,
        chem: 32,
      },

      /**
       * Grain Handling Expenses, in $ cost / bushel.
       */
      handling: {
        hauling: 0.24,
        storage: 0.1,
      },

      /**
       * Field Operation Costs, in $ cost / acre.
       */
      fieldOps: {
        planter: 22.31,
        sprayer: 21,
        combine: 53.75,
      },
    },
  },
};
