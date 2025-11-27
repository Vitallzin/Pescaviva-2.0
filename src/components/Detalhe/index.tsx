import { useState } from 'react'
import type { Produto } from '../../data/produtos'
// NOVO: Importa o CSS do componente
import './Detalhe.css' 

// ALTERAÇÃO NA PROP: Adiciona 'quantidade: number' para melhorar a funcionalidade e acessibilidade
type Props = {
  produto: Produto | null
  onVoltar: () => void
  onAdicionarCarrinho: (produto: Produto, quantidade: number) => void 
}

export default function Detalhe({ produto, onVoltar, onAdicionarCarrinho }: Props){
  // NOVO ESTADO: Para controlar a quantidade a ser adicionada
  const [quantidade, setQuantidade] = useState(1) 
    
  if(!produto) return null

  // Dados do vendedor
  const vendedor = produto.vendedor || { nome: 'Vendedor desconhecido', foto: '/assets/img/pescadores/semfoto.jpg' }
  
  // Função para lidar com a mudança no input de quantidade
  const handleQuantidadeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value)
    // Garante que a quantidade seja pelo menos 1, crucial para neurodivergentes (previsibilidade)
    setQuantidade(val > 0 ? val : 1) 
  }
  
  // Função para adicionar ao carrinho (usando a nova assinatura com quantidade)
  const handleAdicionarCarrinho = () => {
      onAdicionarCarrinho(produto, quantidade)
  }

  return (
    <main id="main-detalhe">
      <div className="produto-detalhe-container">
        
        {/* Botão Voltar */}
        <button className="btn-voltar-detalhe" onClick={onVoltar}>Voltar</button>
        
        {/* Imagem do Produto */}
        <img 
          id="detalhe-imagem" 
          className="imagem-detalhe-produto" 
          src={produto.imagem} 
          alt={produto.titulo} 
        />
        
        {/* Informações Principais e Ações */}
        <div className="info-detalhe-produto" role="group" aria-labelledby="detalhe-titulo">
          <h1 id="detalhe-titulo" className="titulo-detalhe-produto">{produto.titulo}</h1>
          {/* Acessibilidade: h2 no preço, com aria-label explícito */}
          <h2 id="detalhe-preco" className="preco-detalhe-produto" aria-label={`Preço: ${produto.preco}`}>{produto.preco}</h2> 
          
          {/* NOVO: Campo de Quantidade para Acessibilidade Cognitiva */}
          <div className="quantidade-wrapper">
              <label htmlFor="input-quantidade">Quantidade (em kg ou un):</label>
              <input 
                  type="number" 
                  id="input-quantidade"
                  min={1} 
                  value={quantidade} 
                  onChange={handleQuantidadeChange} 
                  aria-live="polite" // Anuncia a mudança de valor (feedback)
                  aria-describedby="detalhe-preco" 
              />
          </div>
          
          {/* Botões de Ação */}
          <button 
            className="btn-adicionar-carrinho" 
            onClick={handleAdicionarCarrinho}
            aria-label={`Adicionar ${quantidade} ${produto.titulo} ao Carrinho`}
          >
            Adicionar {quantidade > 1 ? `(${quantidade})` : ''} ao Carrinho
          </button>
          
          {/* Botão de Compra Direta (ação secundária) */}
          <button 
            className="btn-comprar-detalhe"
            aria-label={`Comprar ${produto.titulo} agora`}
          >
            Comprar Agora
          </button>
        </div>
        
        {/* Detalhes Adicionais (Estrutura e Conteúdo) */}
        <section className="box-produto-detalhado" aria-label="Detalhes Adicionais do Produto">
          <h2 className="titulo-box-detalhe">Detalhes do Produto</h2>
          <div className="box-lista-detalhe">
            <ul id="detalhe-lista" className="lista-detalhe-produto" role="list">
              <li role="listitem"><strong>Descrição:</strong> {produto.descricao}</li>
              <li role="listitem"><strong>Disponibilidade:</strong> {produto.quantidade} kg</li> 
              <li role="listitem">
                <strong>Vendedor:</strong>
                <div className="vendedor-info">
                  <img 
                    src={vendedor.foto} 
                    alt={`Foto do vendedor ${vendedor.nome}`} 
                  />
                  <span className="vendedor-nome">{vendedor.nome}</span>
                </div>
                {/* Botão de contato com rótulo claro */}
                <button 
                    className="pv-btn-chat" 
                    aria-label={`Entrar em contato com o vendedor ${vendedor.nome}`}
                >
                    Chat
                </button>
              </li>
            </ul>
          </div>
        </section>
        
      </div>
    </main>
  )
}