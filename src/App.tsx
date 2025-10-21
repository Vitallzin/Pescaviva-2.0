import React, { useMemo, useState, useEffect } from 'react'
import Banner from './components/Banner'
import CardList from './components/CardList'
import Publicar from './components/Publicar'
import Detalhe from './components/Detalhe'
import Carrinho from './components/Carrinho'
import Chat from './components/Chat'
import Notificacao from './components/Notificacao'
import Header from './components/Header'
import Login from './components/Login'
import Perfil from './components/Perfil'
// Importa TODOS os tipos e dados de mock do arquivo centralizado 'produtos.ts'
import type { Produto, Usuario, ViewType, LoginMode } from './data/produtos' 
import { produtosDestaque as pd, peixesPerto as pp, MOCK_USER } from './data/produtos'

// Tipo auxiliar para o item do carrinho
type CarrinhoItem = Produto & { quantidade: number } 


export default function App(){
  const [view, setView] = useState<ViewType>('lista')
  const [produtoSelecionado, setProdutoSelecionado] = useState<Produto | null>(null)
  const [carrinho, setCarrinho] = useState<CarrinhoItem[]>([])
  
  // Estado do usuário logado
  const [usuarioLogado, setUsuarioLogado] = useState<Usuario | null>(null)
  
  // Estado para controlar o modo inicial da tela de login/cadastro
  const [loginMode, setLoginMode] = useState<LoginMode>('login') 

  // ESTADO E FUNÇÕES PARA O TOAST
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  function showToast(message: string) {
      setToastMessage(message);
      // Remove o toast após 3 segundos
      setTimeout(() => {
          setToastMessage(null);
      }, 3000);
  }

  // Efeito para persistência (Carrega o estado do usuário no início da aplicação)
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('pv_usuario')
      if (storedUser) {
        setUsuarioLogado(JSON.parse(storedUser))
      }
    } catch (error) {
      console.error("Erro ao carregar usuário do localStorage:", error);
      localStorage.removeItem('pv_usuario');
    }
  }, [])

  // Limita o número de produtos para melhor performance do carrossel
  const produtosDestaque = useMemo(()=> pd.slice(0,10), [])
  const peixesPerto = useMemo(()=> pp.slice(0,10), [])

  function verDetalhe(produto:Produto){
    setProdutoSelecionado(produto)
    setView('detalhe')
    window.scrollTo(0,0)
  }

  function adicionarAoCarrinho(produto:Produto){
    setCarrinho(prev => {
      const idx = prev.findIndex((p:CarrinhoItem)=> p.titulo===produto.titulo && p.preco===produto.preco)
      if(idx > -1){
        // SE JÁ EXISTE: Incrementa por +1
        const novoCarrinho = [...prev]
        novoCarrinho[idx].quantidade += 1
        return novoCarrinho
      }
      // SE NÃO EXISTE: Adiciona com quantidade 1 (Garantido!)
      return [...prev, { ...produto, quantidade: 1 }] 
    })
    
    // Mostra o Toast
    showToast(`'${produto.titulo}' adicionado ao carrinho!`) 
  }

  function removerDoCarrinho(index: number){
    setCarrinho(prev => prev.filter((_, i) => i !== index))
  }

  function atualizarQuantidade(index: number, q: number){
    if(q < 1) return
    setCarrinho(prev => prev.map((item, i) => i === index ? { ...item, quantidade: q } : item))
  }
  
  // Função de navegação genérica
  function onNavigate(newView: ViewType) {
    setView(newView)
    window.scrollTo(0,0)
  }

  // Navegação específica para Entrar
  function navigateToLogin() {
    setLoginMode('login')
    setView('login')
    window.scrollTo(0,0)
  }

  // Navegação específica para Cadastrar
  function navigateToCadastro() {
    setLoginMode('cadastro')
    setView('login') // A view é 'login', mas o modo é 'cadastro'
    window.scrollTo(0,0)
  }

  // Lógica de Login (simulação)
  function realizarLogin(email: string) {
    if (email) {
      const userToLogin = MOCK_USER; 
      
      setUsuarioLogado(userToLogin);
      localStorage.setItem('pv_usuario', JSON.stringify(userToLogin)); 
      setView('lista'); 
      return true;
    }
    return false;
  }

  // Lógica de Logout
  function realizarLogout() {
    setUsuarioLogado(null);
    localStorage.removeItem('pv_usuario');
    setView('lista'); 
  }

  return (
    <div id="app-container">
      
      {/* Componente Toast */}
      {toastMessage && (
          <div className="pv-toast">
              <img src="/assets/img/icones/carrinho.png" alt="carrinho" style={{width:20, marginRight: 10}} />
              {toastMessage}
          </div>
      )}

      <Header 
        onNavigate={onNavigate} 
        usuario={usuarioLogado} 
        onLogout={realizarLogout}
        navigateToLogin={navigateToLogin} 
        navigateToCadastro={navigateToCadastro} 
        contagemCarrinho={carrinho.length} 
      />

      {view === 'lista' && (
        <main className="content-lista">
          <Banner />
          <div className="container-main">
            <h2>Peixes em Destaque</h2>
            <CardList produtos={produtosDestaque} onVerDetalhe={verDetalhe} />

            <h2 style={{marginTop: 48}}>Peixes Perto de Você</h2>
            <CardList produtos={peixesPerto} onVerDetalhe={verDetalhe} />
          </div>
        </main>
      )}

      {view === 'detalhe' && (
        <Detalhe
          produto={produtoSelecionado}
          onVoltar={() => setView('lista')}
          onAdicionarCarrinho={adicionarAoCarrinho} // Chamada para adicionar ao carrinho
        />
      )}

      {view === 'carrinho' && (
        <Carrinho
          itens={carrinho}
          onRemover={removerDoCarrinho}
          onAtualizarQuantidade={atualizarQuantidade}
          onVoltar={() => setView('lista')}
        />
      )}

      {view === 'publicar' && (
        <Publicar 
          onVoltar={() => setView('lista')} 
          produtosDestaque={produtosDestaque}
          peixesPerto={peixesPerto}
        />
      )}
      
      {view === 'notificacao' && <Notificacao onVoltar={() => setView('lista')} />}
      
      {view === 'chat' && <Chat onVoltar={() => setView('lista')} />}
      
      {view === 'login' && (
        <Login 
          initialMode={loginMode} 
          onVoltar={() => setView('lista')}
          onLogin={realizarLogin} 
          onNavigate={onNavigate}
        />
      )}

      {/* Renderização da tela de Perfil */}
      {view === 'perfil' && usuarioLogado && (
        <Perfil
            usuario={usuarioLogado}
            onVoltar={() => setView('lista')}
        />
      )}

      <footer className="pv-footer">
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '24px 0' }}>
          <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', justifyContent: 'space-between' }}>
            <div style={{ flex: 1, minWidth: 220 }}>
              <h4 style={{ color: '#fff', marginBottom: 10 }}>Redes sociais</h4>
              <a href="#" target="_blank" rel="noreferrer" style={{color:'#ccc', display:'block', marginBottom: 5}}>Facebook</a>
              <a href="https://www.instagram.com/app.pescaviva/" target="_blank" rel="noreferrer" style={{color:'#ccc', display:'block', marginBottom: 5}}>Instagram</a>
            </div>
            <div style={{ flex: 1, minWidth: 220 }}>
              <h4 style={{ color: '#fff', marginBottom: 10 }}>Contato</h4>
              <div style={{color:'#ccc', marginBottom: 5}}><a href="#" style={{color:'inherit'}}>contato@pescaviva.com.br</a></div>
              <div style={{color:'#ccc', marginBottom: 5}}><a href="#" style={{color:'inherit'}}>(00) 9 9999-9999</a></div>
              <div style={{color:'#ccc', marginBottom: 5}}><a href="#" style={{color:'inherit'}}>Rua dos Navegantes, 145 – Bairro Costa Azul</a></div>
            </div>
            <div style={{ flex: 1, minWidth: 220 }}>
              <h4 style={{ color: '#fff', marginBottom: 10 }}>Sobre</h4>
              <p style={{ color: '#ccc', lineHeight: 1.4 }}>A Pescaviva conecta pescadores diretamente a você, garantindo peixes mais frescos e preços justos. Nossa plataforma facilita a compra e venda de pescados de forma sustentável e transparente.</p>
            </div>
          </div>
        </div>
        <p style={{paddingTop: 10, borderTop: '1px solid #042a54', color: '#ccc'}}>&copy; 2025 Pescaviva. Todos os direitos reservados.</p>
      </footer>
    </div>
  )
}