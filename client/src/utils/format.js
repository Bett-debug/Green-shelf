export function formatCurrency(value) {
try {
return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value)
} catch (e) {
return String(value)
}
}