const formatter = new Intl.NumberFormat(undefined, {
  style: "currency",
  currency: "AUD",
});

export function formatCurrency(value: number) {
  return formatter.format(value);
}
