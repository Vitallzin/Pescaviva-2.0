import React, { useState } from 'react'

const initial = {
  vendedor: [
    { autor: 'vendedor', texto: 'Olá! Como posso ajudar?' },
    { autor: 'usuario', texto: 'Olá, gostaria de saber se o peixe está fresco.' },
    { autor: 'vendedor', texto: 'Sim, foi pescado hoje pela manhã!' }
  ],
  cliente: [
    { autor: 'cliente', texto: 'Oi, vocês entregam na minha região?' },
    { autor: 'usuario', texto: 'Qual sua cidade?' },
    { autor: 'cliente', texto: 'Salvador!' },
    { autor: 'usuario', texto: 'Entregamos sim, com frete grátis!' }
  ]
}

type Msg = { autor: string; texto: string }

// NOVO: Adiciona a prop onVoltar
type Props = {
  onVoltar: () => void
}

export default function Chat({ onVoltar }: Props){
  const [conversas, setConversas] = useState<typeof initial>(initial)
  const [conversaAtual, setConversaAtual] = useState<'vendedor'|'cliente'>('vendedor')
  const [input, setInput] = useState('')

  function enviar(e: React.FormEvent){
    e.preventDefault()
    if(!input.trim()) return
    setConversas(prev => ({ 
      ...prev, 
      [conversaAtual]: [...prev[conversaAtual], { autor: 'usuario', texto: input }] 
    }))
    setInput('')
  }
  
  React.useEffect(() => {
    // Rola para o final do chat ao carregar ou enviar nova mensagem
    const chatDiv = document.getElementById('chat-mensagens')
    if (chatDiv) {
      chatDiv.scrollTop = chatDiv.scrollHeight
    }
  }, [conversas, conversaAtual]);

  return (
    <main id="main-chat">
      <h2>Chat</h2>
      
      {/* CORRIGIDO: Botão Voltar com estilo consistente */}
      <button 
        className='btn-voltar-detalhe'
        style={{maxWidth:'1200px', margin:'0 auto 20px', display:'block'}}
        onClick={onVoltar}
      >Voltar</button>

      {/* NOVO: Contêiner para o layout de duas colunas */}
      <div className="chat-container">
        
        <aside className="lista-contatos">
          <ul id="lista-contatos">
            <li className={`contato ${conversaAtual==='vendedor'?'ativo':''}`} data-contato="vendedor" onClick={() => setConversaAtual('vendedor')}>
              <img src="https://cdn6.campograndenews.com.br/uploads/noticias/2024/10/25/671bb69d54394.jpg" alt="Usuário 1" />
              <span>Rafael Nascimento</span>
            </li>
            <li className={`contato ${conversaAtual==='cliente'?'ativo':''}`} data-contato="cliente" onClick={() => setConversaAtual('cliente')}>
              <img src="https://static.vecteezy.com/ti/vetor-gratis/p1/8799559-vintage-retro-restaurante-comida-classica-com-garfo-colher-e-prato-design-conceito-emblema-logo-template-gratis-vetor.jpg" alt="Usuário 2" />
              <span>Restaurente Nandes</span>
            </li>
          </ul>
        </aside>
        
        <section className="chat-area">
          <div id="chat-mensagens" className="chat-mensagens">
            {conversas[conversaAtual].map((m: Msg, i) => (
              <div key={i} className={`mensagem ${m.autor}`}><span>{m.texto}</span></div>
            ))}
          </div>
          <form id="chat-form" className="chat-form" onSubmit={enviar}>
            <input 
              id="chat-input" 
              value={input} 
              onChange={e => setInput(e.target.value)} 
              placeholder="Digite sua mensagem..."
            />
            {/* CORRIGIDO: Botão de enviar com o ícone de avião de papel (seta estilizada) */}
            <button type="submit" className="btn-enviar-chat" title="Enviar">
              {/* Símbolo que será estilizado para parecer um avião de papel */}
              ➤
            </button>
          </form>
        </section>
        
      </div>
    </main>
  )
}
