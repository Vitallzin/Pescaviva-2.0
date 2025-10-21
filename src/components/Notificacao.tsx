import React from 'react'

const items = [
  { msg: 'Você recebeu uma nova mensagem no chat.', img: '/assets/img/icones/logo_pescaviva.png' },
  { msg: 'Seu pedido foi enviado!', img: '/assets/img/icones/logo_pescaviva.png' },
  { msg: 'Promoção: Peixes frescos com 10% de desconto hoje.', img: '/assets/img/icones/logo_pescaviva.png' }
]

// Define a prop onVoltar
type Props = {
  onVoltar: () => void
}

// O componente recebe as props
export default function Notificacao({ onVoltar }: Props){
  const [selecionada, setSelecionada] = React.useState<number | null>(null)

  // Use useEffect para garantir que a página comece no topo
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main id="main-notificacao">
      <h2>Notificações</h2>
      
      {/* Botão de Voltar com a classe de estilo consistente 'btn-voltar-detalhe' */}
      <button 
        className='btn-voltar-detalhe'
        // Aplica o estilo inline para garantir centralização e margem
        style={{maxWidth:'1200px', margin:'0 auto 20px', display:'block'}}
        onClick={onVoltar} // Usa a função de navegação do App.tsx
      >Voltar</button>

      <div className="notificacao-wrapper">
        <ul id="lista-notificacoes">
          {items.map((it, i) => (
            <li 
              key={i} 
              className={`notificacao-item ${selecionada===i?'notificacao-selecionada':''}`} 
              onClick={() => setSelecionada(i)}
            >
              <img src={it.img} alt="" className="icone-notificacao" />
              <span>{it.msg}</span>
            </li>
          ))}
        </ul>
        <div id="notificacao-detalhe" className="notificacao-detalhe">
          {selecionada===null ? (
            <span className="detalhe-placeholder">Clique em uma notificação para ver os detalhes.</span>
          ) : (
            <div className="detalhe-conteudo">
              <h3>Detalhes da Notificação {selecionada + 1}</h3>
              <p>{items[selecionada].msg}</p>
              <p>Data: {new Date().toLocaleDateString('pt-BR')}</p>
              <button className='pv-btn'>Ver Item Relacionado</button>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
