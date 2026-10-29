import { useState } from 'react'
import { DEFAULT_GRID, DEFAULT_SIZE, MAX_GRID, MAX_SIZE, readSetting } from '@/lib/pixel-art.js'

const ConfigBar = ({ onSubmit }) => {
  const [grid, setGrid] = useState('')
  const [pixels, setPixels] = useState('')

  const submit = () => {
    const gridSize = readSetting(grid, MAX_GRID, DEFAULT_GRID, `Veuillez entrer un nombre entre 1 et ${MAX_GRID}`)
    const pixelSize = readSetting(
      pixels,
      MAX_SIZE,
      DEFAULT_SIZE,
      `Veuillez entrer une taille des pixels entre 1 et ${MAX_SIZE}`,
    )
    onSubmit(gridSize, pixelSize)
  }

  return (
    <div className='config'>
      <input
        type='number'
        name='grid'
        id='grid'
        placeholder='Taille de grille'
        aria-label='Taille de grille'
        min='1'
        max={MAX_GRID}
        value={grid}
        onChange={event => setGrid(event.target.value)}
      />
      <input
        type='number'
        name='pixels'
        id='pixels'
        placeholder='Taille des pixels'
        aria-label='Taille des pixels'
        min='1'
        max={MAX_SIZE}
        value={pixels}
        onChange={event => setPixels(event.target.value)}
      />
      <button className='valid' onClick={submit}>
        Valider
      </button>
    </div>
  )
}

export default ConfigBar
