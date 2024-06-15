export function formatDate(date: Date) {
  return new Intl.DateTimeFormat(navigator.language).format(date);
}

export function formatNumber(number: number) {
  return new Intl.NumberFormat(navigator.language).format(number);
}
