import { COLORS } from '@/lib/pixel-art.js'

const ColorPalette = ({ selected, onSelect }) => (
  <div className='selection'>
    {COLORS.map(({ name, label }) => (
      <button
        key={name}
        className={name === selected ? `btn-${name} active` : `btn-${name}`}
        aria-label={label}
        aria-pressed={name === selected}
        onClick={() => onSelect(name)}
      />
    ))}
  </div>
)

export default ColorPalette
