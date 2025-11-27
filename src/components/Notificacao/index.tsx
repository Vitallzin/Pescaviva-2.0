// src/components/Notificacao.tsx
import React from 'react'
import './Notificacao.css' // Importa o CSS dedicado

// Mock de dados (mantido do original)
const items = [
  { id: 'notif-1', msg: 'Você recebeu uma nova mensagem no chat.', img: '/assets/img/icones/chat.png', detalhe: 'O vendedor Rafael Nascimento respondeu sua pergunta sobre o peixe.' },
  { id: 'notif-2', msg: 'Seu pedido foi enviado!', img: '/assets/img/icones/caminhao.png', detalhe: 'Acompanhe seu pedido #PV1234. Previsão de entrega: amanhã, 14h.' },
  { id: 'notif-3', msg: 'Promoção: Peixes frescos com 10% de desconto hoje.', img: '/assets/img/icones/desconto.png', detalhe: 'Promoção válida apenas para a Tilápia. Limite de 5kg por cliente.' }
]

// Define a prop onVoltar
type Props = {
  onVoltar: () => void
}

export default function Notificacao({ onVoltar }: Props){
  const [selecionada, setSelecionada] = React.useState<number | null>(null)

  // Use useEffect para garantir que a página comece no topo
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // ID estático para o painel de detalhes (necessário para aria-controls)
  const DETALHE_ID = 'notificacao-detalhe'

  return (
    <main id="main-notificacao">
      <h2>Notificações</h2>
      
      {/* Botão de Voltar: Removendo estilos inline */}
      <button 
        className='btn-voltar-detalhe'
        // Aplica classe de estilo para o botão principal do componente,
        // garantindo que o estilo de margem seja tratado no CSS do componente
        style={{marginBottom: '20px', alignSelf: 'center', width: '100%', maxWidth: '1200px', margin: '0 auto 20px', display: 'block'}}
        onClick={onVoltar}
        aria-label="Voltar para a página anterior"
      >Voltar</button>

      <div className="notificacao-wrapper">
        {/* Lista de Notificações */}
        <ul 
            id="lista-notificacoes"
            // Adiciona role="listbox" se as notificações fossem navegáveis como opções.
            // Aqui, usamos role="region" para delimitar a área da lista.
            role="region" 
            aria-label="Lista de Notificações"
        >
          {items.map((it, i) => (
            <li 
              key={i} 
              className={`notificacao-item ${selecionada===i?'notificacao-selecionada':''}`} 
              onClick={() => setSelecionada(i)}
              // Torna o item navegável por teclado (Enter/Space)
              tabIndex={0} 
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setSelecionada(i) }}
              // Acessibilidade: Indica que este item controla o painel de detalhes
              aria-controls={DETALHE_ID} 
              // Indica se este item está selecionado
              aria-selected={selecionada === i}
              role="option"
            >
              {/* Imagem é decorativa (alt="") */}
              <img src={it.img} alt="" className="icone-notificacao" aria-hidden="true" />
              <span>{it.msg}</span>
            </li>
          ))}
        </ul>
        
        {/* Painel de Detalhes */}
        <div 
            id={DETALHE_ID} 
            className="notificacao-detalhe"
            role="region" // Define como uma seção de conteúdo importante
            aria-live="polite" // Notifica o leitor de tela sobre mudanças de conteúdo
            aria-label="Detalhes da Notificação Selecionada"
        >
          {selecionada === null ? (
            <span className="detalhe-placeholder">Clique em uma notificação para ver os detalhes.</span>
          ) : (
            <div className="detalhe-conteudo">
              <h3>Detalhes da Notificação {selecionada + 1}</h3>
              <p>{items[selecionada].detalhe}</p>
              {/* Mock de botão de ação */}
              <button 
                className="pv-btn pv-btn-auth-primary" 
                style={{marginTop: '20px', alignSelf: 'flex-start'}}
              >
                Ver Ação
              </button>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}