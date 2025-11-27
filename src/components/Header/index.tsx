import { useState } from 'react'
import type { Usuario, ViewType } from '../../data/produtos' 
import MenuConta from '../MenuConta'
import { logo_pescaviva, lupa, publicar, notificacao, carrinho } from '../../assets' 
import './Header.css'

type Props = {
  onNavigate: (view: ViewType) => void
  usuario: Usuario | null
  onLogout: () => void
  navigateToLogin: () => void
  navigateToCadastro: () => void
  contagemCarrinho: number // NOVO: Contagem de itens para o badge do carrinho
}

export default function Header({ onNavigate, usuario, onLogout, navigateToLogin, navigateToCadastro, contagemCarrinho }: Props){
  // Estado para controlar a visibilidade do MenuConta
  const [isMenuOpen, setIsMenuOpen] = useState(false) 

  // Função para alternar o menu
  const toggleMenu = () => {
    setIsMenuOpen(prev => !prev)
  }

  // Função para fechar o menu (passada ao MenuConta)
  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  return (
    <header className="pv-header">
      <div className="pv-header-inner">
        
        {/* PV-LEFT: Logo e Busca */}
        <div className="pv-left">
          <img 
            src={logo_pescaviva}
            alt="Pescaviva" 
            className="pv-logo" 
            onClick={() => onNavigate('lista')} 
          />
          <div className="pv-search">
            <input 
              type="text" 
              placeholder="Pesquisar peixes, vendedores, locais..." 
              aria-label="Pesquisar" 
            />
            <button className="pv-search-button" aria-label="Pesquisar" onClick={() => onNavigate('lista')}>
              <img src={ lupa } alt="buscar" />
            </button>
          </div>
        </div>
        
        {/* PV-ACTIONS: Navegação e Usuário */}
        <nav className="pv-actions">
          {/* Botão Publicar */}
          <button className="pv-btn pv-btn-ghost" onClick={() => onNavigate('publicar')}>
            <img src={ publicar } alt="publicar" /> Publicar
          </button>
          
          {/* Botão Notificação */}
          <button className="pv-btn" onClick={() => onNavigate('notificacao')}>
            <img src={ notificacao } alt="notificacao" />
          </button>
          
          {/* Botão Carrinho com Contador (Badge) */}
          <button className="pv-btn pv-carrinho-btn-wrapper" onClick={() => onNavigate('carrinho')}>
            <img src={ carrinho } alt="carrinho" />
            {/* O badge aparece se a contagem for maior que zero */}
            {contagemCarrinho > 0 && <span className="pv-carrinho-badge">{contagemCarrinho}</span>} 
          </button>

          {usuario ? (
            // ----------------------------------------
            // Opções para Usuário Logado (Com Menu de Conta)
            // ----------------------------------------
            <div className="pv-perfil-logado-wrapper">
              <img 
                src={usuario.fotoUrl} 
                alt={usuario.nome} 
                className={`pv-foto-perfil ${isMenuOpen ? 'ativo' : ''}`} 
                onClick={toggleMenu} // Clica para abrir/fechar o menu
                title={`Logado como ${usuario.nome}`}
              />
              
              {isMenuOpen && (
                <MenuConta 
                  usuario={usuario}
                  onNavigate={onNavigate}
                  onLogout={onLogout}
                  onClose={closeMenu} // Passa a função para fechar o menu
                />
              )}
            </div>
          ) : (
            // Botões de Autenticação para Usuário Não Logado
            <div className="pv-auth-buttons">
              <button 
                className="pv-btn pv-btn-auth-ghost" 
                onClick={navigateToLogin} 
              >
                Entrar
              </button>
              <button 
                className="pv-btn pv-btn-auth-primary" 
                onClick={navigateToCadastro}
              >
                Cadastrar
              </button>
            </div>
          )}

        </nav>
      </div>
    </header>
  )
}
