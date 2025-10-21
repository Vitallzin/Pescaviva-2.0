import React from 'react'
import type { Produto } from '../data/produtos'

type Props = {
  produto: Produto | null
  onVoltar: () => void
  onAdicionarCarrinho: (produto: Produto) => void
}

export default function Detalhe({ produto, onVoltar, onAdicionarCarrinho }: Props){
  if(!produto) return null
  const vendedor = produto.vendedor || { nome: 'Vendedor desconhecido', foto: '/assets/img/pescadores/semfoto.jpg' }
  return (
    <main id="main-detalhe">
      <div className="produto-detalhe-container">
        <button className="btn-voltar-detalhe" onClick={onVoltar}>Voltar</button>
        <img id="detalhe-imagem" className="imagem-detalhe-produto" src={produto.imagem} alt={produto.titulo} />
        <div className="info-detalhe-produto">
          <h1 id="detalhe-titulo" className="titulo-detalhe-produto">{produto.titulo}</h1>
          <h1 id="detalhe-preco" className="preco-detalhe-produto">{produto.preco}</h1>
          <button className="btn-adicionar-carrinho" onClick={() => onAdicionarCarrinho(produto)}>Adicionar ao Carrinho</button>
          <button className="btn-comprar-detalhe">Comprar</button>
        </div>
        <section className="box-produto-detalhado">
          <h2 className="titulo-box-detalhe">Detalhes do Produto</h2>
          <div className="box-lista-detalhe">
            <ul id="detalhe-lista" className="lista-detalhe-produto">
              <li><strong>Descrição:</strong> {produto.descricao}</li>
              <li><strong>Disponibilidade:</strong> {produto.quantidade} kg</li>
              <li>
                <strong>Vendedor:</strong>
                <span style={{display:'flex', alignItems:'center', gap:8}}>
                  <img src={vendedor.foto} alt="Foto do vendedor" style={{width:32,height:32,borderRadius:'50%',border:'1.5px solid #003b73'}} />
                  {vendedor.nome}
                </span>
              </li>
            </ul>
          </div>
        </section>
      </div>
    </main>
  )
}
