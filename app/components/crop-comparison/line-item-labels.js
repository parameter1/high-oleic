const labels = {
  'crop.rtm': () => 'What is your return to management cost?',
  'crop.land': () => 'What is your land cost per acre?',
  'crop.tax': () => 'What is your farm’s property tax cost per acre?',
  'crop.int': () => 'What is your interest cost per acre?',
  'crop.ins': ({ cropName }) => `What is your ${cropName || ''} insurance cost per acre?`,
  'crop.seeds': ({ cropName }) => `What is your ${cropName || ''} seed cost per acre?`,
  'crop.fertLime': ({ cropName }) => `What is your ${cropName || ''} fertilizer cost per acre, excluding Nitrogen?`,
  'crop.nitro': ({ cropName }) => `What is your ${cropName || ''} nitrogen cost per acre?`,

  'chemicals.herb': ({ cropName }) => `What is your ${cropName || ''} herbicide cost per acre?`,
  'chemicals.insect': ({ cropName }) => `What is your ${cropName || ''} fungicide/insecticide cost per acre?`,

  'fieldOps.sprayer': ({ cropName }) => `What is your ${cropName || ''} spray cost per acre?`,
  'fieldOps.equipment': ({ cropName }) => `What is your ${cropName || ''} equipment cost per acre?`,
  'fieldOps.other': ({ cropName }) => `What are your other ${cropName || ''} operation costs per acre?`,

  'handling.hauling': ({ cropName }) => `What is your ${cropName || ''} grain hauling cost per bushel?`,
  'handling.dryer': ({ cropName }) => `What is your ${cropName || ''} drying cost per bushel?`,
  'handling.storage': ({ cropName }) => `What is your ${cropName || ''} storage cost per bushel?`,
};

export default ({ id, cropName }) => {
  const func = labels[id];
  if (!func) return null;
  return func({ cropName });
};
