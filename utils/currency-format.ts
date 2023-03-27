const currencyFormatter = new Intl.NumberFormat("nb-NO", {
  style: "currency",
  currency: "NOK",
  currencyDisplay: "symbol",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
  currencySign: "accounting"
});

const percentFormatter = new Intl.NumberFormat("nb-NO", {
  style: "percent",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2
});

export const formatCurrency = (number: number): string => currencyFormatter.format(number);

export const formatPercent = (number: number): string => percentFormatter.format(number);
