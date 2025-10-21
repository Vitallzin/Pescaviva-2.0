import React, { useEffect, useMemo, useRef, useState } from 'react'
// Importamos o tipo Produto de onde ele é definido
import type { Produto } from '../data/produtos'

// NOVO: As props agora incluem os dados e a função de navegação
type Props = {
  onVoltar: () => void
  produtosDestaque: Produto[]
  peixesPerto: Produto[]
}

// O componente recebe as props
export default function Publicar({ onVoltar, produtosDestaque, peixesPerto }: Props){
  // Combina as duas listas de produtos para a sugestão de nomes e preços
  const todosPeixes = useMemo(() => [...produtosDestaque, ...peixesPerto], [produtosDestaque, peixesPerto])

  // Cria uma lista de peixes únicos (pelo título)
  const peixesUnicos = useMemo(() => {
    const nomes = new Set<string>()
    const lista: Produto[] = []
    todosPeixes.forEach(p => {
      // Usamos toLowerCase para garantir que a comparação seja case-insensitive
      if (!nomes.has(p.titulo.toLowerCase())) {
        nomes.add(p.titulo.toLowerCase())
        lista.push(p)
      }
    })
    return lista
  }, [todosPeixes])

  // Estado para os campos controlados e referências
  const produtoPeixeRef = useRef<HTMLInputElement>(null)
  const [precoBase, setPrecoBase] = useState(0)
  const [faixaPrecoVisible, setFaixaPrecoVisible] = useState(false)
  const [precoFinal, setPrecoFinal] = useState(0)

  // Efeito para popular o datalist e rolar para o topo
  useEffect(() => {
    // preenche o datalist dinamicamente (progressive enhancement)
    const datalist = document.getElementById('lista-peixes') as HTMLDataListElement | null
    if (datalist) {
      datalist.innerHTML = ''
      peixesUnicos.forEach(p => {
        const option = document.createElement('option')
        option.value = p.titulo
        datalist.appendChild(option)
      })
    }
    // Garante que a página comece no topo
    window.scrollTo(0, 0)
  }, [peixesUnicos])

  // Helpers
  function extrairPrecoReais(precoStr?: string): number {
    if (!precoStr) return 0
    // Remove tudo que não for dígito, vírgula, e substitui vírgula por ponto.
    const cleaned = precoStr.replace(/[^\\d,]/g, '').replace(',', '.')
    return parseFloat(cleaned) || 0
  }

  function calcularPreco(peixe: string): number {
    const produtoEncontrado = peixesUnicos.find(p => p.titulo.toLowerCase() === peixe.toLowerCase())
    // Retorna o preço base (do primeiro produto encontrado)
    return produtoEncontrado ? extrairPrecoReais(produtoEncontrado.preco) : 0
  }

  // Handlers
  const handlePeixeChange = () => {
    const peixe = produtoPeixeRef.current?.value
    if (peixe) {
      const preco = calcularPreco(peixe)
      setPrecoBase(preco)
      setPrecoFinal(preco) 
      setFaixaPrecoVisible(preco > 0)
    } else {
      setPrecoBase(0)
      setPrecoFinal(0)
      setFaixaPrecoVisible(false)
    }
  }

  const handleRangeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Atualiza o preço final com base no slider
    setPrecoFinal(parseFloat(e.target.value))
  }
  
  const handlePrecoInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Atualiza o preço final com base na entrada de texto
    const novoPreco = parseFloat(e.target.value)
    if (!isNaN(novoPreco)) {
      setPrecoFinal(novoPreco)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Apenas para demonstração
    alert(`Produto '${produtoPeixeRef.current?.value}' publicado com sucesso por R$ ${precoFinal.toFixed(2).replace('.', ',')}!`)
    onVoltar() // Volta para a lista após a publicação
  }

  // Lógica de Preço (Análise da IA)
  const AJUSTE = 3.00
  const base = precoBase || 0 
  const MIN_AJUSTE = Math.max(0, base - AJUSTE) 
  const MAX_AJUSTE = base + AJUSTE

  return (
    <main id="main-publicar">
      {/* Botão Voltar com estilização consistente */}
      <button 
        className="btn-voltar-detalhe" 
        onClick={onVoltar}
        style={{maxWidth:'400px', margin:'0 auto 20px', display:'block'}} 
      >Voltar</button>

      <div className="publicar-container">
        <h2>Publicar um Produto</h2>
        <form className="form-publicar" id="form-publicar" onSubmit={handleSubmit}>
          <label htmlFor="produto-peixe">Nome do Peixe:</label>
          <input 
            ref={produtoPeixeRef} 
            type="text" 
            id="produto-peixe" 
            list="lista-peixes" 
            placeholder="Digite o nome do peixe" 
            autoComplete="off" 
            required 
            onChange={handlePeixeChange} 
          />
          <datalist id="lista-peixes"></datalist>

          <div id="faixa-preco" style={{display: faixaPrecoVisible ? 'block' : 'none'}}>
            <h4>Análise da IA</h4>
            <p>Preço base médio: R$ <span id="preco-base">{base.toFixed(2).replace('.', ',')}</span></p>
            
            {/* Slider de ajuste */}
            <label htmlFor="ajuste-preco">Ajustar preço (entre R$ {MIN_AJUSTE.toFixed(2).replace('.', ',')} e R$ {MAX_AJUSTE.toFixed(2).replace('.', ',')}):</label>
            <input 
              type="range" 
              id="ajuste-preco" 
              min={MIN_AJUSTE} 
              max={MAX_AJUSTE} 
              value={precoFinal} 
              step="0.01" 
              onChange={handleRangeChange}
            />
          </div>
          
          {/* NOVO CAMPO DE VALOR: Permite inserir o preço manualmente */}
          <label htmlFor="produto-preco-final">Preço Final (R$):</label>
          <input 
            type="number" 
            id="produto-preco-final"
            min={MIN_AJUSTE} // Usa os limites sugeridos pela IA
            max={MAX_AJUSTE}
            step="0.01" 
            value={precoFinal.toFixed(2)} 
            onChange={handlePrecoInputChange}
            required
            style={{marginTop:8, textAlign: 'center'}}
          />

          <label htmlFor="produto-descricao">Descrição:</label>
          <textarea id="produto-descricao" placeholder="Descreva seu produto" required />

          <label htmlFor="produto-imagem">Imagem do Produto:</label>
          <div className="file-upload-wrapper">
            <input type="file" id="produto-imagem" accept="image/*" required />
          </div>

          <button type="submit">Publicar Produto</button>
        </form>
      </div>
    </main>
  )
}