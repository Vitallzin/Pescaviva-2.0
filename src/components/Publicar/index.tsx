// src/components/Publicar.tsx
import React, { useEffect, useMemo, useRef, useState } from 'react'
import type { Produto } from '../../data/produtos'
import './Publicar.css' // Importa o CSS dedicado

// Mock para categorias e unidades de medida
const CATEGORIAS = ['Peixe', 'Crustáceo', 'Molusco', 'Outros']
const UNIDADES = ['kg', 'unidade', 'pacote']

// NOVO: As props agora incluem os dados e a função de navegação
type Props = {
  onVoltar: () => void
  produtosDestaque: Produto[]
  peixesPerto: Produto[]
}

export default function Publicar({ onVoltar, produtosDestaque, peixesPerto }: Props){
  const todosPeixes = useMemo(() => [...produtosDestaque, ...peixesPerto], [produtosDestaque, peixesPerto])

  // Cria uma lista de peixes únicos (pelo título)
  const peixesUnicos = useMemo(() => {
    const nomes = new Set<string>()
    const lista: Produto[] = []
    todosPeixes.forEach(p => {
      if (!nomes.has(p.titulo.toLowerCase())) {
        nomes.add(p.titulo.toLowerCase())
        lista.push(p)
      }
    })
    return lista
  }, [todosPeixes])

  // Estado para os campos controlados
  const [nomeProduto, setNomeProduto] = useState('')
  const [precoBase, setPrecoBase] = useState(0) // Preço sugerido
  const [precoFinal, setPrecoFinal] = useState(0) // Preço ajustado pelo usuário
  const [categoria, setCategoria] = useState(CATEGORIAS[0])
  const [unidade, setUnidade] = useState(UNIDADES[0])
  const [descricao, setDescricao] = useState('')

  // Referência para o input de texto, útil para focagem
  const produtoNomeRef = useRef<HTMLInputElement>(null)
  
  // Limites de ajuste do range (Mantido do original)
  const MIN_AJUSTE = useMemo(() => precoBase * 0.8, [precoBase])
  const MAX_AJUSTE = useMemo(() => precoBase * 1.2, [precoBase])


  // Efeito para sugerir preço ao mudar o nome do produto
  useEffect(() => {
    // 1. Encontra um produto que corresponde ao nome digitado
    const peixeEncontrado = peixesUnicos.find(p => p.titulo.toLowerCase() === nomeProduto.toLowerCase())
    
    if(peixeEncontrado) {
      // 2. Extrai o preço (Assumindo que o preço está no formato "R$ X,XX/kg")
      const precoStr = peixeEncontrado.preco.replace('R$', '').replace('/kg', '').replace(',', '.').trim()
      const preco = parseFloat(precoStr) || 0
      setPrecoBase(preco)
      setPrecoFinal(preco) // Inicializa o preço final com o preço base
    } else {
      // Se o produto não for encontrado, zera os preços
      setPrecoBase(0)
      setPrecoFinal(0)
    }
  }, [nomeProduto, peixesUnicos])


  // Handlers para o controle de preço
  const handleRangeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrecoFinal(parseFloat(e.target.value))
  }
  
  const handlePrecoInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const valor = parseFloat(e.target.value)
    // Garante que o valor manual esteja dentro dos limites sugeridos
    if (!isNaN(valor)) {
      setPrecoFinal(Math.max(MIN_AJUSTE, Math.min(MAX_AJUSTE, valor)))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Lógica de publicação (Mock)
    alert(`Produto "${nomeProduto}" (R$ ${precoFinal.toFixed(2)}/${unidade}) publicado com sucesso!`)
    onVoltar() // Volta para a lista
  }


  return (
    <main id="main-publicar" aria-label="Formulário de Publicação de Produto">
      
      <div className="publicar-container-main">
        <button 
          className='btn-voltar-detalhe' 
          onClick={onVoltar} 
          aria-label="Voltar para a página anterior"
        >
          Voltar
        </button>
        
        <h2>Anunciar Novo Produto</h2>

        {/* Uso de role="form" e onsubmit no form */}
        <form className="form-publicar" onSubmit={handleSubmit} role="form">
          
          {/* GRUPO 1: Detalhes Básicos do Produto */}
          <fieldset>
            <legend>Detalhes do Produto</legend>
            
            {/* Campo Nome do Produto com Sugestão (Datalist) */}
            <label htmlFor="produto-nome">Nome do Produto</label>
            <input 
              ref={produtoNomeRef}
              type="text" 
              id="produto-nome" 
              list="peixes-sugeridos" 
              placeholder="Ex: Tilápia, Camarão, etc."
              value={nomeProduto}
              onChange={(e) => setNomeProduto(e.target.value)}
              required
              className="input-with-suggestion"
              aria-describedby="dicas-nome" // Associa com a lista de sugestões
            />
            
            {/* Lista de sugestões (Datalist) */}
            <datalist id="peixes-sugeridos">
              {peixesUnicos.map(p => (
                <option key={p.titulo} value={p.titulo} />
              ))}
            </datalist>
            <small id="dicas-nome" style={{color: '#666'}}>
                Selecione ou digite o nome do seu produto. Preços médios serão sugeridos.
            </small>

            {/* Campo Categoria */}
            <label htmlFor="produto-categoria">Categoria</label>
            <select 
              id="produto-categoria" 
              value={categoria}
              onChange={(e) => setCategoria(e.target.value)}
              required
            >
              {CATEGORIAS.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            
            {/* Campo Unidade de Medida */}
            <label htmlFor="produto-unidade">Unidade de Venda</label>
            <select 
              id="produto-unidade" 
              value={unidade}
              onChange={(e) => setUnidade(e.target.value)}
              required
            >
              {UNIDADES.map(un => (
                <option key={un} value={un}>{un}</option>
              ))}
            </select>
          </fieldset>


          {/* GRUPO 2: Preço e Quantidade */}
          <fieldset className="campo-preco-final">
            <legend>Definição de Preço (Base: R$ {precoBase.toFixed(2)})</legend>
            
            <div className="display-preco">
                R$ {precoFinal.toFixed(2)}/{unidade}
            </div>

            {/* Range de Ajuste de Preço (Acessibilidade: label explícito) */}
            <label htmlFor="ajuste-preco">Ajustar preço (entre R$ {MIN_AJUSTE.toFixed(2).replace('.', ',')} e R$ {MAX_AJUSTE.toFixed(2).replace('.', ',')}):</label>
            <input 
              type="range" 
              id="ajuste-preco" 
              min={MIN_AJUSTE} 
              max={MAX_AJUSTE} 
              value={precoFinal} 
              step="0.01" 
              onChange={handleRangeChange}
              aria-valuetext={`Preço ajustado para R$ ${precoFinal.toFixed(2)}`}
            />
            
            {/* Campo de Valor Manual */}
            <label htmlFor="produto-preco-final">Preço Final (R$):</label>
            <input 
              type="number" 
              id="produto-preco-final"
              min={MIN_AJUSTE}
              max={MAX_AJUSTE}
              step="0.01" 
              value={precoFinal.toFixed(2)} 
              onChange={handlePrecoInputChange}
              required
              aria-label="Preço final do produto em Reais"
            />
          </fieldset>
          
          {/* GRUPO 3: Imagem e Descrição */}
          <fieldset>
            <legend>Detalhes Adicionais</legend>

            <label htmlFor="produto-descricao">Descrição:</label>
            <textarea 
                id="produto-descricao" 
                placeholder="Descreva seu produto, o método de pesca, frescor e outras informações relevantes." 
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
                required 
            />

            <label htmlFor="produto-imagem">Imagem do Produto (Obrigatória):</label>
            <div className="file-upload-wrapper">
              <input 
                type="file" 
                id="produto-imagem"
                required
                accept="image/*"
              />
            </div>
          </fieldset>
          
          {/* Botão de Envio */}
          <button type="submit" className="pv-btn-publicar">
            Publicar Anúncio
          </button>
        </form>
      </div>
    </main>
  )
}