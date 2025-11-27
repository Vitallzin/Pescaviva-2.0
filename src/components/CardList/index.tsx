import { useRef, useEffect, useState } from 'react'
import type { Produto } from '../../data/produtos'
// NOVO: Importa o arquivo de estilo específico do componente
import './CardList.css' 

type Props = {
  produtos: Produto[]
  onVerDetalhe?: (produto: Produto) => void
}

// O componente agora também chama onVerDetalhe se o card for clicado
export default function CardList({ produtos, onVerDetalhe }: Props){
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [showPrev, setShowPrev] = useState(false)
  const [showNext, setShowNext] = useState(false)

  // ... (useEffect e scrollByAmount permanecem os mesmos) ...
  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const update = () => {
      const { scrollLeft, scrollWidth, clientWidth } = el
      setShowPrev(scrollLeft > 20) 
      setShowNext(scrollLeft + clientWidth < scrollWidth - 20)
    }

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
    const scrollAmount = el.clientWidth * 0.75 // Rola 75% da largura visível
    el.scrollBy({
      left: dir === 'right' ? scrollAmount : -scrollAmount,
      behavior: 'smooth',
    })
  }

  // NOVO: Adiciona um título de contexto para a lista (acessibilidade e SEO)
  const listTitle = "Produtos em Destaque" 

  return (
    <div className="card-list-wrapper" role="region" aria-label={listTitle}>
      <h3>{listTitle}</h3>
      
      {/* Botão Anterior */}
      <button
        aria-hidden={!showPrev}
        className={`prev-produto ${showPrev ? 'visible' : ''}`}
        onClick={() => scrollByAmount('left')}
        aria-label="Rolar para a esquerda"
      >
        &lt;
      </button>

      {/* ROLAGEM: Usa role="list" para acessibilidade de lista */}
      <div 
        ref={containerRef} 
        className="card-container" 
        role="list"
        aria-orientation="horizontal"
      >
        {produtos.map((produto, i) => (
          // NOVO: Usa role="listitem" e um evento onKeyDown para acessibilidade por teclado
          <div 
            key={i} 
            className="card-item" 
            onClick={() => onVerDetalhe && onVerDetalhe(produto)}
            role="listitem"
            tabIndex={0} // Torna o item focável
            onKeyDown={(e) => {
                // Permite ativar o card com Enter ou Space
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault(); 
                    onVerDetalhe && onVerDetalhe(produto);
                }
            }}
            aria-label={`Ver detalhes do produto ${produto.titulo}`}
          >
            <img 
              className="card-imagem" 
              src={produto.imagem} 
              alt={produto.titulo} 
            />
            <div className="card-info">
              <h2 className="titulo">{produto.titulo}</h2>
              <p className="descricao">{produto.descricao}</p>
              <div className="card-footer">
                <span className="localizacao">{produto.local || 'Localidade'}</span>
                <span className="data">{produto.data || 'Hoje'}</span>
              </div>
            </div>
            
            {/* Otimização do Botão de Compra/Detalhe */}
            <button 
              className="botao_comprar" 
              onClick={(event) => {
                // Ação do botão é sempre explícita
                event.stopPropagation(); // Impede o clique no card
                onVerDetalhe && onVerDetalhe(produto);
              }}
              // Acessibilidade: Garante que o leitor de tela leia o preço
              aria-label={`Comprar ou ver detalhes: Preço ${produto.preco}`}
            >
              Ver Detalhes por <span className="preco-no-botao">{produto.preco}</span>
            </button>
          </div>
        ))}
      </div>

      {/* Botão Próximo */}
      <button
        aria-hidden={!showNext}
        className={`proximo-produto ${showNext ? 'visible' : ''}`}
        onClick={() => scrollByAmount('right')}
        aria-label="Rolar para a direita"
      >&gt;</button>
    </div>
  )
}