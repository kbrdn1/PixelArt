import { useEffect, useRef } from 'react'

const PixelGrid = ({ grid, size, onPaint }) => {
  const painting = useRef(false)

  // arrêter de peindre quand on relâche la souris, même hors de la grille
  useEffect(() => {
    const stop = () => {
      painting.current = false
    }
    window.addEventListener('mouseup', stop)
    return () => window.removeEventListener('mouseup', stop)
  }, [])

  const start = (event, row, col) => {
    if (event.button !== 0) return
    painting.current = true
    onPaint(row, col)
  }

  const enter = (row, col) => {
    if (painting.current) onPaint(row, col)
  }

  return (
    <div id='invader' onDragStart={event => event.preventDefault()}>
      {grid.map((cells, row) => (
        <div className='row' key={row}>
          {cells.map((color, col) => (
            <div
              key={col}
              className={color === 'none' ? 'cell' : `cell ${color}`}
              style={{ width: size, height: size }}
              onMouseDown={event => start(event, row, col)}
              onMouseEnter={() => enter(row, col)}
              onDoubleClick={() => onPaint(row, col, 'none')}
            />
          ))}
        </div>
      ))}
    </div>
  )
}

export default PixelGrid
