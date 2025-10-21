import React, { useEffect, useState } from 'react'

export default function Banner(){
  const [idx, setIdx] = useState(0)
  const imgs = ['assets/img/banner/banner1.png','assets/img/banner/banner2.jpg']

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
