import type { Produto } from '../../data/produtos'
// NOVO: Importa o arquivo de estilo específico do componente
import './Carrinho.css' 

// Reutiliza o tipo de item do carrinho definido no App.tsx ou redefine-o aqui
type CarrinhoItem = Produto & { quantidade: number }

type Props = {
  itens: CarrinhoItem[]
  onRemover: (index: number) => void
  onAtualizarQuantidade: (index: number, q: number) => void
  onVoltar: () => void
}

// Função auxiliar para extrair o valor numérico (mantida)
function extrairValorNumerico(precoStr: string): number {
    if (!precoStr) return 0;
    const apenasNumeros = precoStr.replace(/[^\\d,\\.]/g, ''); 
    const valorPadrao = apenasNumeros.replace(',', '.'); 
    return Number(valorPadrao) || 0;
}

export default function Carrinho({ itens, onRemover, onAtualizarQuantidade, onVoltar }: Props){
  
  // Lógica de cálculo
  const total = itens.reduce((acc, it) => {
    const precoNum = extrairValorNumerico(it.preco)
    return acc + precoNum * it.quantidade
  }, 0)
  
  // Formata o total para exibição
  const totalFormatado = total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
  
  // NOVO: Calcula o subtotal para cada item para maior clareza
  const calcularSubtotal = (item: CarrinhoItem) => {
    const precoNum = extrairValorNumerico(item.preco)
    return (precoNum * item.quantidade).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
  }

  return (
    <main id="main-carrinho">
      {/* Classe consistente de botão de voltar */}
      <button className='btn-voltar-detalhe' onClick={onVoltar} style={{marginBottom: '20px'}}>Voltar</button>
      
      <h2>Carrinho de Compras ({itens.length} {itens.length === 1 ? 'item' : 'itens'})</h2>
      
      {/* Acessibilidade: role="list" para indicar uma lista de itens */}
      <ul id="lista-carrinho" role="list"> 
        {itens.length === 0 ? 
          <li style={{padding: '20px', textAlign: 'center', color: '#666'}}>
            O seu carrinho está vazio. Adicione alguns peixes frescos!
          </li> 
        : itens.map((produto, idx) => (
          // Acessibilidade: role="listitem" para cada item
          <li className="item-carrinho" key={idx} role="listitem"> 
            <img src={produto.imagem} alt={`Foto do produto ${produto.titulo}`} />
            
            {/* Informações principais do produto */}
            <span className="info-produto-carrinho">
              <strong style={{display: 'block', fontSize: '1.1em'}}>{produto.titulo}</strong>
              <small style={{color: '#999'}}>{produto.preco}</small>
            </span>
            
            {/* NOVO: Wrapper para o Input de Quantidade (melhora a usabilidade cognitiva) */}
            <div className='input-quantidade-wrapper'>
              <label htmlFor={`quantidade-${idx}`}>Qtd</label>
              <input
                id={`quantidade-${idx}`} // ID para a label
                type="number" 
                min={1} 
                value={produto.quantidade} 
                onChange={e => onAtualizarQuantidade(idx, parseInt(e.target.value || '1'))} 
                // Acessibilidade: Rótulo mais detalhado para leitores de tela
                aria-label={`Quantidade do produto ${produto.titulo}`} 
              />
            </div>

            {/* Subtotal do Item (Adicionado para clareza) */}
            <span style={{fontSize: '1em', fontWeight: 'bold', minWidth: '80px', textAlign: 'right'}}>
                {calcularSubtotal(produto)}
            </span>
            
            {/* Botão Remover (alinhado à direita) */}
            <button 
              className="btn-remover" 
              onClick={() => onRemover(idx)}
              aria-label={`Remover ${produto.titulo} do carrinho`} // Acessibilidade
            >
              Remover
            </button>
          </li>
        ))}
      </ul>

      {/* Resumo e Checkout */}
      {itens.length > 0 && (
        <div className="resumo-carrinho">
          <h3>Resumo do Pedido</h3>
          
          <div className="resumo-linha">
            <span>Subtotal:</span>
            <span>{totalFormatado}</span>
          </div>
          <div className="resumo-linha">
            <span>Frete:</span>
            <span>Grátis</span> {/* Assumindo frete grátis conforme a sugestão do chat */}
          </div>

          <div className="resumo-linha total-linha">
            <span>Total:</span>
            <span id="total-carrinho">{totalFormatado}</span>
          </div>

          <button className="pv-btn-checkout">Finalizar Compra</button>
        </div>
      )}
    </main>
  )
}