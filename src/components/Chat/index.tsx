import React, { useState, useRef, useEffect } from 'react'
// NOVO: Importa o CSS do componente
import './Chat.css' 

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

type Props = {
  onVoltar: () => void
}

export default function Chat({ onVoltar }: Props){
  const [conversas, setConversas] = useState<typeof initial>(initial)
  const [conversaAtual, setConversaAtual] = useState<'vendedor'|'cliente'>('vendedor')
  const [input, setInput] = useState('')
  // Ref para rolar automaticamente para a última mensagem (Previsibilidade)
  const messagesEndRef = useRef<HTMLDivElement>(null) 

  function enviar(e: React.FormEvent){
    e.preventDefault()
    if(!input.trim()) return
    setConversas(prev => ({ 
      ...prev, 
      [conversaAtual]: [...prev[conversaAtual], { autor: 'usuario', texto: input }] 
    }))
    setInput('')
  }
  
  // Efeito para rolar para a última mensagem
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [conversas, conversaAtual])


  // Função unificada para selecionar contato (para clique e teclado)
  const handleSelectContact = (contato: 'vendedor' | 'cliente') => {
    setConversaAtual(contato)
  }

  // Nome do contato atual (para aria-labels e melhor contexto)
  const contatoAtualNome = conversaAtual === 'vendedor' ? 'Rafael Nascimento (Vendedor)' : 'Restaurente Nandes (Cliente)'

  return (
    <main id="main-chat">
      <button className='btn-voltar-detalhe' onClick={onVoltar} style={{marginBottom: '20px'}}>Voltar</button>
      <h2>Mensagens</h2>
      <div className="chat-container">
        
        {/* Lista de Contatos */}
        <aside className="contatos-lista" role="complementary" aria-label="Lista de Contatos">
          <ul role="list">
            {/* Contato Vendedor */}
            <li 
              className={`contato ${conversaAtual==='vendedor'?'ativo':''}`} 
              onClick={() => handleSelectContact('vendedor')}
              tabIndex={0} // Torna focável
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleSelectContact('vendedor') }}
              role="listitem"
            >
              <img src="https://example.com/caminho/vendedor.jpg" alt="Foto do Vendedor Rafael Nascimento" />
              <span>Rafael Nascimento</span>
            </li>
            {/* Contato Cliente */}
            <li 
              className={`contato ${conversaAtual==='cliente'?'ativo':''}`} 
              onClick={() => handleSelectContact('cliente')}
              tabIndex={0} // Torna focável
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleSelectContact('cliente') }}
              role="listitem"
            >
              <img src="https://static.vecteezy.com/ti/vetor-gratis/p1/8799559-vintage-retro-restaurante-comida-classica-com-garfo-colher-e-prato-design-conceito-emblema-logo-template-gratis-vetor.jpg" alt="Foto do Restaurante Nandes" />
              <span>Restaurente Nandes</span>
            </li>
          </ul>
        </aside>
        
        {/* Área de Conversa */}
        <section 
          className="chat-area" 
          role="main" 
          aria-label={`Conversa com ${contatoAtualNome}`}
        >
          <div 
            id="chat-mensagens" 
            className="chat-mensagens"
            role="log" // Role mais apropriado para logs de conversa
            aria-live="polite" // Leitor de tela anuncia novas mensagens (para novas mensagens)
          >
            {conversas[conversaAtual].map((m: Msg, i) => (
              <div 
                key={i} 
                className={`mensagem ${m.autor}`} 
                role="listitem" 
                // Acessibilidade: Rótulo claro para leitores de tela
                aria-label={`Mensagem de ${m.autor === 'usuario' ? 'você' : contatoAtualNome}: ${m.texto}`}
              >
                <span>{m.texto}</span>
              </div>
            ))}
            {/* Elemento de rolagem */}
            <div ref={messagesEndRef} />
          </div>
          
          {/* Formulário de Envio */}
          <form id="chat-form" className="chat-form" onSubmit={enviar} role="form">
            <input 
              id="chat-input" 
              value={input} 
              onChange={e => setInput(e.target.value)} 
              placeholder="Digite sua mensagem..."
              // Acessibilidade: Rótulo completo
              aria-label={`Campo de texto para digitar mensagem para ${contatoAtualNome}`}
            />
            <button 
              type="submit" 
              className="btn-enviar-chat" 
              aria-label="Enviar Mensagem" // Rótulo claro para leitores de tela
              title="Enviar Mensagem"
            >
              &#10148;
            </button>
          </form>
        </section>
      </div>
    </main>
  )
}