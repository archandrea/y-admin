export function formatFigure(n, symbol = ',') {
  if (!n) {
    return '0'
  }
  const parts = Number(n).toString().split('.')
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, symbol)
  return parts.join('.')
}