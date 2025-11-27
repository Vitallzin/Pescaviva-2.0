// src/components/MenuConta.tsx
import React, { useEffect, useRef } from 'react'
import type { ViewType, Usuario } from '../../data/produtos'
import './MenuConta.css' // Importa o CSS dedicado

type Props = {
  usuario: Usuario
  onNavigate: (view: ViewType) => void
  onLogout: () => void
  onClose: () => void // Função para fechar o menu
}

export default function MenuConta({ usuario, onNavigate, onLogout, onClose }: Props) {
  const dropdownRef = useRef<HTMLDivElement>(null)

  // 1. Função que navega e fecha o menu
  const handleNavigate = (view: ViewType) => {
    onNavigate(view)
    onClose()
  }

  // 2. Função que faz logout e fecha o menu
  const handleLogout = () => {
    onLogout()
    onClose()
  }

  // 3. Efeito para Foco e Fechamento por Teclado/Clique Externo
  useEffect(() => {
    const dropdownElement = dropdownRef.current
    if (!dropdownElement) return

    // Tenta focar o primeiro item do menu ao abrir (Melhora a navegação por teclado)
    const firstFocusable = dropdownElement.querySelector('.pv-menu-btn') as HTMLElement
    if (firstFocusable) {
        firstFocusable.focus()
    }

    // Gerencia o fechamento do menu ao clicar fora
    const handleClickOutside = (event: MouseEvent) => {
        // Verifica se o clique não foi dentro do menu E nem no botão que o abriu (o botão está no Header.tsx)
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
            // Se o clique foi fora, fecha o menu
            onClose();
        }
    }

    // Gerencia o fechamento ao pressionar a tecla ESC
    const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
            onClose();
        }
    }

    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleKeyDown)

    return () => {
        document.removeEventListener('mousedown', handleClickOutside)
        document.removeEventListener('keydown', handleKeyDown)
    }
  }, [onClose])
  
  // Lista de itens do menu
  const menuItems = [
    { view: 'perfil', label: 'Meu Perfil', icon: '/assets/img/icones/perfil.png' },
    { view: 'chat', label: 'Mensagens', icon: '/assets/img/icones/chat.png' },
    { view: 'notificacao', label: 'Notificações', icon: '/assets/img/icones/notificacao.png' }, // Usando o ícone de notificação do Header.tsx (mock)
    { view: 'carrinho', label: 'Meu Carrinho', icon: '/assets/img/icones/carrinho.png' }, // Usando o ícone de carrinho do Header.tsx (mock)
  ]


  return (
    // Adiciona role="menu" e ref para gerenciamento de foco
    <div 
        className="pv-menu-conta-dropdown" 
        ref={dropdownRef}
        role="menu" // Tag semântica para menus flutuantes
        aria-orientation="vertical" // Indica que as opções estão em coluna
    >
      
      <div className="pv-menu-conta-header">
        <img 
            src={usuario.fotoUrl} 
            alt={`Foto de perfil de ${usuario.nome}`} 
            className="pv-foto-perfil-menu" 
            aria-hidden="true" // O alt é redundante aqui, apenas visual.
        />
        <h4>{usuario.nome}</h4>
        <p>{usuario.email}</p>
      </div>

      <div className="pv-menu-conta-opcoes">
        {menuItems.map((item) => (
            <button 
                key={item.view}
                className="pv-menu-btn" 
                onClick={() => handleNavigate(item.view as ViewType)}
                role="menuitem" // Identifica o item como uma opção do menu
                aria-label={item.label}
            >
                {/* Ícones de mock: Você deve garantir que os assets existam */}
                <img src={item.icon} alt="" aria-hidden="true" /> 
                {item.label}
            </button>
        ))}

        <div className="pv-menu-separador" />

        {/* Botão de Logout */}
        <button 
            className="pv-menu-btn logout-btn" 
            onClick={handleLogout}
            role="menuitem" // Item do menu
        >
            <img src="/assets/img/icones/logout.png" alt="" aria-hidden="true" /> Sair
        </button>
      </div>
    </div>
  )
}