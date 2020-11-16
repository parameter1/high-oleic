module.exports = [
  {
    type: 'crop',
    label: 'Crop Expenses',
    description: '',
    unit: 'perAcre',
    lineItems: [
      { type: 'land', label: 'Land', fixed: true },
      { type: 'tax', label: 'Tax', fixed: true },
      { type: 'rtm', label: 'Return to Management', fixed: true },
      { type: 'int', label: 'Interest (Operating)' },
      { type: 'ins', label: 'Insurance' },
      { type: 'seeds', label: 'Seeds' },
      { type: 'fertLime', label: 'Fertilizer + Lime' },
      { type: 'nitro', label: 'Nitrogen' },
      { type: 'chem', label: 'Chemicals' },
    ],
  },
  {
    type: 'fieldOps',
    label: 'Field Operations',
    description: '',
    unit: 'perAcre',
    lineItems: [
      { type: 'nitro', label: 'Nitrogen Application' },
      { type: 'cult', label: 'Field Cultivation' },
      { type: 'planter', label: 'Planter' },
      { type: 'drill', label: 'Drill' },
      { type: 'sprayer', label: 'Sprayer' },
      { type: 'combine', label: 'Combine' },
      { type: 'vrt', label: 'VRT', when: ({ cropType }) => (cropType === 'corn') },
      { type: 'other', label: 'Other' },
    ],
  },
  {
    type: 'handling',
    label: 'Grain Handling Expenses',
    description: '',
    unit: 'perBushel',
    lineItems: [
      { type: 'hauling', label: 'Hauling' },
      { type: 'dryer', label: 'Dryer' },
      { type: 'storage', label: 'Storage' },
    ],
  },
].map((category) => {
  const lineItems = category.lineItems.map((lineItem) => ({
    ...lineItem,
    categoryType: category.type,
  }));
  return {
    ...category,
    lineItems,
  };
});
