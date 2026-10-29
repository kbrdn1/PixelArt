// tailles par défaut et limites (mêmes valeurs que la version vanilla)
export const DEFAULT_GRID = 8
export const DEFAULT_SIZE = 50
export const MAX_GRID = 20
export const MAX_SIZE = 50
export const DEFAULT_COLOR = 'black'

// couleurs disponibles : `none` remet la cellule à vide
export const COLORS = [
  { name: 'none', label: 'Gomme', hex: '#d2dae2' },
  { name: 'black', label: 'Noir', hex: '#485460' },
  { name: 'yellow', label: 'Jaune', hex: '#fbc048' },
  { name: 'green', label: 'Vert', hex: '#79ea83' },
]

// raccourcis clavier : chiffre (pavé ou maj) ou touche AZERTY de la même rangée
const KEY_COLORS = {
  1: 'none',
  '&': 'none',
  2: 'black',
  é: 'black',
  3: 'yellow',
  '"': 'yellow',
  4: 'green',
  "'": 'green',
}

export const colorHex = name => COLORS.find(color => color.name === name)?.hex

export const createGrid = size => Array.from({ length: size }, () => Array(size).fill('none'))

// renvoie la même grille si la cellule a déjà la couleur (évite un rendu inutile en drag)
export const paintCell = (grid, row, col, color) =>
  grid[row][col] === color
    ? grid
    : grid.map((cells, i) => (i === row ? cells.map((cell, j) => (j === col ? color : cell)) : cells))

// champ vide = valeur par défaut, hors limites = alerte puis valeur par défaut
export function readSetting(raw, max, fallback, message) {
  if (raw === '') return fallback
  const value = Number.parseInt(raw, 10)
  if (Number.isNaN(value) || value < 1 || value > max) {
    alert(message)
    return fallback
  }
  return value
}

// traduit une touche en action, ou null si la touche doit être ignorée
export function keyToAction(event) {
  const { target, key } = event
  const typing = target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement
  if (typing || event.ctrlKey || event.metaKey || event.altKey) return null
  if (Object.hasOwn(KEY_COLORS, key)) return { type: 'select', color: KEY_COLORS[key] }
  if (key === 'c' || key === 'C') return { type: 'clear' }
  if (key === 'r' || key === 'R') return { type: 'reset' }
  return null
}
