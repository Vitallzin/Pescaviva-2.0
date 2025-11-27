import { useEffect, useState } from 'react'
import { banner1, banner2 } from '../../assets'
// NOVO: Importa o arquivo de estilo específico do componente
import './Banner.css' 

export default function Banner(){
  const [idx, setIdx] = useState(0)
  // Estado para controlar a pausa (Acessibilidade Cognitiva)
  const [isPaused, setIsPaused] = useState(false) 
  const imgs = [banner1, banner2]

  useEffect(() => {
    // Controla o ciclo automático, pausando se isPaused for true
    if (isPaused) return 

    const id = setInterval(() => {
      setIdx(i => (i + 1) % imgs.length)
    }, 6500) 
    
    return () => clearInterval(id)
  }, [imgs.length, isPaused]) 

  const nextBanner = () => {
    // Pausa o ciclo ao interagir manualmente
    setIsPaused(true) 
    setIdx(i => (i + 1) % imgs.length)
  }

  const prevBanner = () => {
    // Pausa o ciclo ao interagir manualmente
    setIsPaused(true) 
    setIdx(i => (i - 1 + imgs.length) % imgs.length)
  }
  
  const togglePause = () => {
    setIsPaused(p => !p)
  }

  return (
    <div className="banner"> {/* Classe "banner" no Banner.css */}
      {imgs.map((src, i) => (
        <img 
          key={i} 
          src={src} 
          alt={`Oferta de destaque ${i+1}`} 
          // Oculta imagens não visíveis para leitores de tela
          aria-hidden={i !== idx} 
          // Estilo dinâmico para controlar qual imagem está visível
          style={{display: i === idx ? 'block' : 'none'}} 
        />
      ))}

      {/* Botão Anterior */}
      <button 
        className="pv-banner-control pv-banner-prev" 
        onClick={prevBanner} 
        aria-label="Banner Anterior"
      >
        &#10094;
      </button>

      {/* Botão Próximo */}
      <button 
        className="pv-banner-control pv-banner-next" 
        onClick={nextBanner} 
        aria-label="Próximo Banner"
      >
        &#10095;
      </button>

      {/* Controle de Pausa/Play */}
      <button 
        className="pv-banner-control pv-banner-pause" 
        onClick={togglePause} 
        aria-label={isPaused ? "Retomar Carrossel" : "Pausar Carrossel"}
      >
        {isPaused ? '▶' : '⏸'}
      </button>
    </div>
  )
}