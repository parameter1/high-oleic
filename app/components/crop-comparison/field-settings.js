export default {
  acres: () => ({
    attrs: { type: 'number', min: 1, required: true },
    hint: 'Only include the acres being evaluated for high oleic production for accurate comparison',
  }),
  pricePerBushel: ({ crop } = {}) => {
    const suffix = crop ? ` for ${crop}` : '';
    return {
      attrs: {
        type: 'number',
        min: 0.01,
        step: 0.01,
        required: true,
      },
      hint: `What market price would you like to use${suffix}, in dollars per bushel`,
    };
  },
  premiumPerBushel: () => ({
    attrs: {
      type: 'number',
      min: 0,
      step: 0.01,
      required: true,
    },
    hint: 'Premiums across the nation can range from $.25-$.75, depending on your location and market demand',
  }),
  yieldPerAcre: () => ({
    attrs: { type: 'number', min: 1, required: true },
    hint: 'The yield of the crop, in bushels per acre',
  }),
};
