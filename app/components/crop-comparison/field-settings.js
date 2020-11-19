export default {
  acres: {
    attrs: { type: 'number', min: 1, required: true },
    hint: 'Only include the acres being evaluated for high oleic production for accurate comparison',
  },
  yieldPerAcre: {
    attrs: { type: 'number', min: 1, required: true },
    hint: 'The yield of the crop, in bushels per acre',
  },
};
