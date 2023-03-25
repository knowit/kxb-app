const currencyFormatter = new Intl.NumberFormat("nb-NO", {
  style: "currency",
  currency: "NOK",
  currencyDisplay: "symbol",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
  currencySign: "accounting"
});

export const formatCurrency = (number: number): string => currencyFormatter.format(number);
