const currencyFormatter = new Intl.NumberFormat("nb-NO", {
  minimumFractionDigits: 2
});

export const formatCurrency = number => `NOK ${currencyFormatter.format(number)}`;
