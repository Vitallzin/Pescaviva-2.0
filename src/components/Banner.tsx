import { useEffect, useState } from 'react'
import { banner1, banner2 } from '../assets'

export default function Banner(){
  const [idx, setIdx] = useState(0)
  const imgs = [banner1, banner2]

  useEffect(()=>{
    const id = setInterval(()=> setIdx(i => (i+1)%imgs.length), 6500)
    return ()=> clearInterval(id)
  },[])

  return (
    <div className="banner">
      {imgs.map((src, i) => (
        <img key={i} src={src} alt={`banner ${i+1}`} style={{display: i===idx? 'block' : 'none'}} />
      ))}
    </div>
  )
}
