// src/components/MenuConta.tsx
import React from 'react'
import type { ViewType, Usuario } from '../data/produtos'

type Props = {
  usuario: Usuario
  onNavigate: (view: ViewType) => void
  onLogout: () => void
  onClose: () => void // Função para fechar o menu
}

export default function MenuConta({ usuario, onNavigate, onLogout, onClose }: Props) {
  
  // Função que navega e fecha o menu
  const handleNavigate = (view: ViewType) => {
    onNavigate(view)
    onClose()
  }

  // Função que faz logout e fecha o menu
  const handleLogout = () => {
    onLogout()
    onClose()
  }

  return (
    // Adicione uma classe para estilização e posicionamento
    <div className="pv-menu-conta-dropdown">
      <div className="pv-menu-conta-header">
        <img src={usuario.fotoUrl} alt={usuario.nome} className="pv-foto-perfil-menu" />
        <h4>{usuario.nome}</h4>
        <p>{usuario.email}</p>
      </div>

      <div className="pv-menu-conta-opcoes">
        {/* CORRIGIDO: Agora navega para a view 'perfil' */}
        <button 
            className="pv-menu-btn" 
            onClick={() => handleNavigate('perfil')} // <-- CORREÇÃO AQUI
        >
            <img src="assets/img/icones/perfil.png" alt="Perfil" /> Meu Perfil
        </button>
        
        {/* Opção para o Chat (Mensagens) */}
        <button 
            className="pv-menu-btn" 
            onClick={() => handleNavigate('chat')}
        >
            <img src="assets/img/icones/chat.png" alt="Chat" /> Mensagens
        </button>

        <div className="pv-menu-separador" />
        
        {/* O botão Sair da Conta (Não está mais no header) */}
        <button 
            className="pv-menu-btn pv-menu-logout" 
            onClick={handleLogout}
        >
            <img src="assets/img/icones/sair.png" alt="Sair" /> Sair da Conta
        </button>
      </div>
    </div>
  )
}