import { useEffect, useState } from 'react'

// pastille de la couleur sélectionnée qui suit la souris (son propre état : seul elle re-rend)
const PixelCursor = ({ color }) => {
  const [position, setPosition] = useState(null)

  useEffect(() => {
    const move = event => setPosition({ top: event.pageY + 5, left: event.pageX + 5 })
    document.addEventListener('mousemove', move)
    return () => document.removeEventListener('mousemove', move)
  }, [])

  return <div className='cursor' aria-hidden='true' style={{ backgroundColor: color, ...position }} />
}

export default PixelCursor
