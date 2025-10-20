export function formatCurrency(value) {
  try {
    if (value == null) return "";
    return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(value);
  } catch {
    return String(value);
  }
}
