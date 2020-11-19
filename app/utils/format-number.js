const { NumberFormat } = Intl;

export default {
  integer: (value) => new NumberFormat().format(parseInt(value, 10)),
  usd: (value) => new NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value),
};
