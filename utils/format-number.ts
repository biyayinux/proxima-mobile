export function formatNumber(value: number | string): string {
  if (value === null || value === undefined) return "";
  const num = typeof value === "string" ? parseFloat(value) : value;
  if (isNaN(num)) return "";

  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}
