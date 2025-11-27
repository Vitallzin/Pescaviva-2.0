import { useMemo, useState, useEffect } from 'react'
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
// NOVO: Importa o componente Footer
import Footer from './components/Footer'
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

  // Efeito para rolar para o topo ao mudar a view
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [view])


  const onLogin = (email: string) => {
    // Lógica simplificada de login de mock
    if (email === MOCK_USER.email) {
      setUsuarioLogado(MOCK_USER)
      setView('lista')
      return true
    }
    alert('Usuário não encontrado. Tente com o e-mail: ' + MOCK_USER.email)
    return false
  }
  
  const onLogout = () => {
    setUsuarioLogado(null)
    setView('lista')
  }
  
  const onAdicionarCarrinho = (produto: Produto, quantidade: number = 1) => {
      // 1. Verifica se o produto já está no carrinho
      const index = carrinho.findIndex(item => item.id === produto.id)

      if (index !== -1) {
          // 2. Se estiver, atualiza a quantidade
          const novoCarrinho = [...carrinho]
          novoCarrinho[index].quantidade += quantidade
          setCarrinho(novoCarrinho)
      } else {
          // 3. Se não estiver, adiciona o novo item
          setCarrinho([...carrinho, { ...produto, quantidade }])
      }
      alert(`${quantidade}x ${produto.titulo} adicionado(s) ao carrinho!`)
  }
  
  const onRemoverCarrinho = (index: number) => {
    setCarrinho(carrinho.filter((_, i) => i !== index))
  }
  
  const onAtualizarQuantidade = (index: number, novaQuantidade: number) => {
    const q = Math.max(1, novaQuantidade) // Garante que a quantidade seja no mínimo 1
    const novoCarrinho = [...carrinho]
    novoCarrinho[index].quantidade = q
    setCarrinho(novoCarrinho)
  }

  // Mapeamento dos componentes de View
  const CurrentView = useMemo(() => {
    switch(view){
      case 'publicar':
        return <Publicar onVoltar={() => setView('lista')} produtosDestaque={pd} peixesPerto={pp} />
      case 'detalhe':
        // A prop onAdicionarCarrinho agora espera a quantidade (ajustado para o Detalhe.tsx anterior)
        return <Detalhe produto={produtoSelecionado} onVoltar={() => setView('lista')} onAdicionarCarrinho={onAdicionarCarrinho} />
      case 'carrinho':
        return <Carrinho itens={carrinho} onRemover={onRemoverCarrinho} onAtualizarQuantidade={onAtualizarQuantidade} onVoltar={() => setView('lista')} />
      case 'chat':
        return <Chat onVoltar={() => setView('lista')} />
      case 'notificacao':
        return <Notificacao onVoltar={() => setView('lista')} />
      case 'login':
      case 'cadastro':
        return <Login onVoltar={() => setView('lista')} onLogin={onLogin} onNavigate={setView} initialMode={loginMode} />
      case 'perfil':
        if(!usuarioLogado) return <p>Acesso negado.</p>
        return <Perfil usuario={usuarioLogado} onVoltar={() => setView('lista')} />
      case 'lista':
      default:
        // View 'lista' (Home)
        return (
          <>
            <Banner />
            <h2>Produtos em Destaque</h2>
            <CardList produtos={pd} onVerDetalhe={(p) => { setProdutoSelecionado(p); setView('detalhe') }} />
            <h2>Peixes Perto de Você</h2>
            <CardList produtos={pp} onVerDetalhe={(p) => { setProdutoSelecionado(p); setView('detalhe') }} />
          </>
        )
    }
  }, [view, produtoSelecionado, carrinho, usuarioLogado, loginMode])
  
  // Função para navegar para o login ou cadastro
  const navigateToLogin = () => {
    setLoginMode('login')
    setView('login')
  }
  const navigateToCadastro = () => {
    setLoginMode('cadastro')
    setView('cadastro')
  }

  // Conta o número total de itens no carrinho
  const contagemCarrinho = useMemo(() => carrinho.reduce((acc, item) => acc + item.quantidade, 0), [carrinho])

  return (
    <>
      {/* Header sempre visível */}
      <Header 
        onNavigate={setView}
        usuario={usuarioLogado}
        onLogout={onLogout}
        navigateToLogin={navigateToLogin}
        navigateToCadastro={navigateToCadastro}
        contagemCarrinho={contagemCarrinho}
      />
      
      {/* Conteúdo Principal (Centralizado) */}
      <main>
        {CurrentView}
      </main>
      
      {/* NOVO: Footer como um componente limpo */}
      <Footer />
    </>
  )
}