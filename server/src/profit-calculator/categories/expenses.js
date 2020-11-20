module.exports = [
  {
    type: 'crop',
    label: 'Crop Expenses',
    description: '',
    unit: 'perAcre',
    lineItems: [
      {
        type: 'rtm',
        label: 'Return to Management',
        fixed: true,
      },
      {
        type: 'land',
        label: 'Land',
        fixed: true,
      },
      {
        type: 'tax',
        label: 'Taxes',
        fixed: true,
      },
      {
        type: 'int',
        label: 'Interest',
      },
      {
        type: 'ins',
        label: 'Insurance',
      },
      {
        type: 'seeds',
        label: 'Seed',
      },
      {
        type: 'fertLime',
        label: 'Fertilizer',
      },
      {
        type: 'nitro',
        label: 'Nitrogen',
      },
    ],
  },
  {
    type: 'chemicals',
    label: 'Chemical Expenses',
    description: '',
    unit: 'perAcre',
    lineItems: [
      { type: 'herb', label: 'Herbicides' },
      { type: 'insect', label: 'Insecticides / Fungicide' },
    ],
  },
  {
    type: 'fieldOps',
    label: 'Field Operations',
    description: '',
    unit: 'perAcre',
    lineItems: [
      // { type: 'nitro', label: 'Nitrogen Application' },
      // { type: 'cult', label: 'Field Cultivation' },
      // { type: 'planter', label: 'Planter' },
      // { type: 'drill', label: 'Drill' },
      { type: 'sprayer', label: 'Spray' },
      { type: 'equipment', label: 'Equipment' },
      // { type: 'combine', label: 'Combine' },
      // { type: 'vrt', label: 'VRT', when: ({ cropType }) => (cropType === 'corn') },
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
