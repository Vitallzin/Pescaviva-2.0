import React from 'react'
import type { Produto } from '../data/produtos'

// Reutiliza o tipo de item do carrinho definido no App.tsx ou redefine-o aqui
type CarrinhoItem = Produto & { quantidade: number }

type Props = {
  itens: CarrinhoItem[]
  onRemover: (index: number) => void
  onAtualizarQuantidade: (index: number, q: number) => void
  onVoltar: () => void
}

// NOVO: Função auxiliar para extrair o valor numérico
function extrairValorNumerico(precoStr: string): number {
    if (!precoStr) return 0;
    
    // 1. Remove qualquer texto ou símbolo (R$, /kg, etc.), mantendo apenas dígitos, vírgula e ponto.
    // Isso é importante para strings como "R$ 25,00/kg"
    const apenasNumeros = precoStr.replace(/[^\d,\.]/g, ''); 
    
    // 2. Tenta identificar se o formato é Brasileiro (1.000,00) ou Americano (1,000.00)
    // Para simplificação, vamos assumir que a vírgula é o separador decimal (formato brasileiro).
    
    // 3. Substitui vírgula (decimal) por ponto (padrão JS/TS)
    const valorPadrao = apenasNumeros.replace(',', '.'); 
    
    // 4. Converte para número.
    return Number(valorPadrao) || 0;
}


export default function Carrinho({ itens, onRemover, onAtualizarQuantidade, onVoltar }: Props){
  
  // Lógica de cálculo corrigida
  const total = itens.reduce((acc, it) => {
    const precoNum = extrairValorNumerico(it.preco)
    return acc + precoNum * it.quantidade
  }, 0)
  
  // Formata o total para exibição
  const totalFormatado = total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
  

  return (
    <main id="main-carrinho">
      <button onClick={onVoltar}>Voltar</button>
      <h2>Carrinho de Compras</h2>
      <ul id="lista-carrinho">
        {itens.length === 0 ? <li>Carrinho vazio.</li> : itens.map((produto, idx) => (
          <li className="item-carrinho" key={idx}>
            <img src={produto.imagem} alt={produto.titulo} />
            <span><strong>{produto.titulo}</strong> - {produto.preco}</span>
            <input 
              type="number" 
              min={1} 
              value={produto.quantidade} 
              onChange={e => onAtualizarQuantidade(idx, parseInt(e.target.value || '1'))} 
            />
            <button className="btn-remover" onClick={() => onRemover(idx)}>Remover</button>
          </li>
        ))}
      </ul>

      <div className="resumo-carrinho">
        <h3>Resumo do Pedido</h3>
        <p>Subtotal: {totalFormatado}</p>
        <p>Frete: R$ 0,00 (Grátis)</p>
        <p className="carrinho-total">Total: <span>{totalFormatado}</span></p>
        <button className="pv-btn-checkout">Finalizar Pedido</button>
      </div>
    </main>
  )
}