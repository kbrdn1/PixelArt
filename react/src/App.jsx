import { useEffect, useReducer } from 'react'
import ColorPalette from '@/components/ColorPalette.jsx'
import ConfigBar from '@/components/ConfigBar.jsx'
import PixelCursor from '@/components/PixelCursor.jsx'
import PixelGrid from '@/components/PixelGrid.jsx'
import {
  colorHex,
  createGrid,
  DEFAULT_COLOR,
  DEFAULT_GRID,
  DEFAULT_SIZE,
  keyToAction,
  paintCell,
} from '@/lib/pixel-art.js'

const initialState = {
  grid: createGrid(DEFAULT_GRID),
  size: DEFAULT_SIZE,
  color: DEFAULT_COLOR,
}

function reducer(state, action) {
  switch (action.type) {
    case 'select':
      return { ...state, color: action.color }
    case 'paint': {
      const grid = paintCell(state.grid, action.row, action.col, action.color ?? state.color)
      return grid === state.grid ? state : { ...state, grid }
    }
    case 'clear':
      return { ...state, grid: createGrid(state.grid.length) }
    case 'reset':
      return { ...state, grid: createGrid(DEFAULT_GRID), size: DEFAULT_SIZE }
    case 'configure':
      return { ...state, grid: createGrid(action.grid), size: action.size }
    default:
      return state
  }
}

const App = () => {
  const [{ grid, size, color }, dispatch] = useReducer(reducer, initialState)

  // raccourcis clavier : 1-4 pour la couleur, c pour clear, r pour reset
  useEffect(() => {
    const onKeyDown = event => {
      const action = keyToAction(event)
      if (action) dispatch(action)
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [])

  return (
    <>
      <ConfigBar onSubmit={(gridSize, pixelSize) => dispatch({ type: 'configure', grid: gridSize, size: pixelSize })} />
      <section>
        <PixelGrid
          grid={grid}
          size={size}
          onPaint={(row, col, paintColor) => dispatch({ type: 'paint', row, col, color: paintColor })}
        />
        <div className='actions'>
          <button id='clear' onClick={() => dispatch({ type: 'clear' })}>
            Clear
          </button>
          <button id='reset' onClick={() => dispatch({ type: 'reset' })}>
            Reset
          </button>
        </div>
        <ColorPalette selected={color} onSelect={name => dispatch({ type: 'select', color: name })} />
        <PixelCursor color={colorHex(color)} />
      </section>
    </>
  )
}

export default App
