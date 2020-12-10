const hints = {
  'crop.rtm': () => 'What is your return to management cost? This is often referred to as cost of living and is calculated by adding all draws from the farm to you personally, and any items that would be on a budget to include health insurance, vehicle payments, etc. If you do not know this number, simply put $0 and the tool will analyze the differences between the crops equally. If you’d like to know more about how to calculate your return to management cost, visit <a href="https://agviewsolutions.com/free-tools/" target="_blank" rel="noopener" class="text-secondary-3">agviewsolutions.com/free-tools</a> for a tutorial and a spreadsheet/decision-making tool.',
  'crop.land': () => 'What is your land cost per acre? This should include all principal payments on land plus your total cash rent cost, divided by ALL of your acres, not just the acres being evaluated in this scenario. If you don’t know exactly, use a rough number and it will auto-populate for both sides.',
  'crop.tax': () => 'What is your farm’s property tax cost per acre? This should include all tax costs divided by ALL acres, not just the ones evaluated in this scenario.',
  'crop.int': () => 'What is your interest cost per acre? This should include all interest on borrowed money that the farm is paying for divided by ALL acres farmed, not just the acres in this scenario. You can find a rough estimate from your previous year tax return.',
  'crop.ins': ({ cropName }) => `What is your ${cropName || ''} insurance cost per acre?`,
  'crop.seeds': ({ cropName }) => {
    if (cropName === 'High Oleic Soybeans') return `What is your ${cropName || ''} seed cost per acre? Seed costs for High Oleic Soybeans are the same or lower as most other soybean costs.`;
    return '';
  },
  'crop.fertLime': ({ cropName }) => `What is your ${cropName || ''} fertilizer cost per acre, exlcuding Nitrogen? P, K, micro’s and application cost/acre.`,
  'crop.nitro': ({ cropName }) => `What is your ${cropName || ''} nitrogen cost per acre?`,

  'chemicals.herb': ({ cropName }) => {
    if (cropName === 'High Oleic Soybeans') return 'Keep in mind today’s High Oleic Soybean technologies include conventional and Roundup Ready products only. How might your herbicide cost be affected by this, and how might your number of passes and hence rates and amount be affected by this?';
    return `What is your ${cropName || ''} herbicide cost per acre?`;
  },
  'chemicals.insect': ({ cropName }) => `What is your ${cropName || ''} fungicide/insecticide cost per acre?`,

  'fieldOps.sprayer': ({ cropName }) => `What is your ${cropName || ''} spray cost per acre? This should include the spray cost for one application, TIMES the number of passes you anticipate making on these acres.`,
  'fieldOps.equipment': ({ cropName }) => `What is your ${cropName || ''} equipment cost per acre? The best way to input this number is write down the passes it takes to put the crop in and take the crop out, and assign a value per pass for each field operation. You can use university rates if you do not know your own numbers. If you would like to learn more about calculating your equipment cost of production, visit <a href="https://agviewsolutions.com/profit-manager/" target="_blank" rel="noopener" class="text-secondary-3">agviewsolutions.com/profit-manager</a> to learn more.`,

  'handling.hauling': ({ cropName }) => `What is your ${cropName || ''} grain hauling cost per bushel? If you haul most of your own grain, but don’t necessarily know your cost, put in a number of what it would cost you for someone else to haul it.`,
  'handling.dryer': ({ cropName }) => `What is your ${cropName || ''} drying cost per bushel? For instance, if you anticipate drying 5 points on corn and the cost for you or the elevator to dry is $0.03/bushel, you enter $0.15/bushel.`,
  'handling.storage': ({ cropName }) => `What is your ${cropName || ''} storage cost per bushel? A baseline storage rate from your local elevator will suffice (cents/bushel for storage times length of storage if you anticipate holding for a long time). If you own most of your storage with no debt you can assign $0.03/bushel to put the crop in and take the crop out ($0.06 total).`,
};

export default ({ id, cropName }) => {
  const func = hints[id];
  if (!func) return null;
  return func({ cropName });
};
