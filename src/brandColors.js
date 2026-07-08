export const BRAND_COLORS = {
  '900 Global': '#4fa3c7',
  Brunswick: '#d9484b',
  DV8: '#8b5fbf',
  Ebonite: '#4bbf8b',
  Hammer: '#e2a33d',
  Motiv: '#5f8fde',
  Radical: '#de6f3d',
  'Roto Grip': '#3dbf9e',
  Storm: '#c1442e',
}

export const BRANDS = Object.keys(BRAND_COLORS)

export function brandColor(brand) {
  return BRAND_COLORS[brand] || '#8c8272'
}
