import { useRef, useEffect, useState } from 'react'
import type { Produto } from '../data/produtos'

type Props = {
  produtos: Produto[]
  onVerDetalhe?: (produto: Produto) => void
}

// O componente agora também chama onVerDetalhe se o card for clicado
export default function CardList({ produtos, onVerDetalhe }: Props){
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [showPrev, setShowPrev] = useState(false)
  const [showNext, setShowNext] = useState(false)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const update = () => {
      const { scrollLeft, scrollWidth, clientWidth } = el
      // Ajuste o offset para 20 para refletir o padding lateral e centralização
      setShowPrev(scrollLeft > 20) 
      // show next when there's more to scroll on the right
      setShowNext(scrollLeft + clientWidth < scrollWidth - 20)
    }

    // initial
    update()

    el.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      el.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [produtos])

  const scrollByAmount = (dir: 'left' | 'right') => {
    const el = containerRef.current
    if (!el) return
    // Scroll por 90% da largura do contêiner para uma rolagem mais acentuada
    const amount = Math.round(el.clientWidth * 0.9) 
    el.scrollBy({ left: dir === 'left' ? -amount : amount, behavior: 'smooth' })
  }

  // render
  return (
    <div className="container-wrapper">
      <button
        aria-hidden={!showPrev}
        className={`voltar-produto ${showPrev ? 'visible' : ''}`}
        onClick={() => scrollByAmount('left')}
      >&lt;</button>

      <div ref={containerRef} className="container" role="list">
        {produtos.map((produto, idx) => (
          // Adiciona onClick ao card para ver detalhes
          // Usa className 'card-clicavel' para estilização de cursor
          <div 
            className={`card ${produto.link === 'descricao' ? 'card-clicavel' : ''}`} 
            key={idx} 
            role="listitem"
            onClick={() => produto.link === 'descricao' && onVerDetalhe && onVerDetalhe(produto)}
          >
            <div className="card-media">
              <img className="card-img" src={produto.imagem} alt={produto.titulo} />
            </div>
            <div className="card-content">
              {/* Preço removido daqui para ser exibido no botão */}
              <h2 className="titulo">{produto.titulo}</h2>
              <p className="descricao">{produto.descricao}</p>
              <div className="card-footer">
                <span className="localizacao">{produto.local || 'Localidade'}</span>
                <span className="data">{produto.data || 'Hoje'}</span>
              </div>
            </div>
            {/* Botão de comprar com preço e estilização aprimorada */}
            {produto.link === 'descricao' ? (
              // Adiciona 'event.stopPropagation()' para evitar que o clique no botão
              // ative o clique no card inteiro também
              <button 
                className="botao_comprar" 
                onClick={(event) => {
                  event.stopPropagation(); 
                  onVerDetalhe && onVerDetalhe(produto);
                }}
              >
                Comprar por <span className="preco-no-botao">{produto.preco}</span>
              </button>
            ) : (
              // Se não for clicável, o botão desabilitado mostra o preço
              <button className="botao_comprar" disabled>
                Vendido por <span className="preco-no-botao">{produto.preco}</span>
              </button>
            )}
          </div>
        ))}
      </div>

      <button
        aria-hidden={!showNext}
        className={`proximo-produto ${showNext ? 'visible' : ''}`}
        onClick={() => scrollByAmount('right')}
      >&gt;</button>
    </div>
  )
}