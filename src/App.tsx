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
import Footer from './components/Footer'

import type { Produto, Usuario, LoginMode, ViewType } from './data/produtos'
import { produtosDestaque as pd, peixesPerto as pp, MOCK_USER } from './data/produtos'

// Extende o ViewType exportado para também aceitar 'cadastro'
type AppView = ViewType | 'cadastro'

// Tipo para itens do carrinho
type CarrinhoItem = Produto & { quantidade: number }

export default function App() {
  const [view, setView] = useState<AppView>('lista')
  const [produtoSelecionado, setProdutoSelecionado] = useState<Produto | null>(null)
  const [carrinho, setCarrinho] = useState<CarrinhoItem[]>([])
  const [usuarioLogado, setUsuarioLogado] = useState<Usuario | null>(null)
  const [loginMode, setLoginMode] = useState<LoginMode>('login')

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [view])

  // LOGIN
  const onLogin = (email: string) => {
    if (email === MOCK_USER.email) {
      setUsuarioLogado(MOCK_USER)
      setView('lista')
      return true
    }
    alert('Usuário não encontrado. Tente com: ' + MOCK_USER.email)
    return false
  }

  const onLogout = () => {
    setUsuarioLogado(null)
    setView('lista')
  }

  // ADICIONAR AO CARRINHO
  const onAdicionarCarrinho = (produto: Produto, quantidade: number = 1) => {
    const index = carrinho.findIndex(
      item => item.titulo === produto.titulo && item.preco === produto.preco
    )

    if (index !== -1) {
      const novo = [...carrinho]
      novo[index].quantidade += quantidade
      setCarrinho(novo)
    } else {
      setCarrinho([...carrinho, { ...produto, quantidade }])
    }

    alert(`${quantidade}x ${produto.titulo} adicionado ao carrinho!`)
  }

  const onRemoverCarrinho = (index: number) => {
    setCarrinho(carrinho.filter((_, i) => i !== index))
  }

  const onAtualizarQuantidade = (index: number, nova: number) => {
    const q = Math.max(1, nova)
    const novo = [...carrinho]
    novo[index].quantidade = q
    setCarrinho(novo)
  }

  // CurrentView
  const CurrentView = useMemo(() => {
    switch (view) {
      case 'publicar':
        return <Publicar onVoltar={() => setView('lista')} produtosDestaque={pd} peixesPerto={pp} />

      case 'detalhe':
        return (
          <Detalhe
            produto={produtoSelecionado}
            onVoltar={() => setView('lista')}
            onAdicionarCarrinho={onAdicionarCarrinho}
          />
        )

      case 'carrinho':
        return (
          <Carrinho
            itens={carrinho}
            onRemover={onRemoverCarrinho}
            onAtualizarQuantidade={onAtualizarQuantidade}
            onVoltar={() => setView('lista')}
          />
        )

      case 'chat':
        return <Chat onVoltar={() => setView('lista')} />

      case 'notificacao':
        return <Notificacao onVoltar={() => setView('lista')} />

      case 'login':
      case 'cadastro':
        return (
          <Login
            onVoltar={() => setView('lista')}
            onLogin={onLogin}
            // Login espera um callback que receba um ViewType; passamos um wrapper para garantir tipos
            onNavigate={(v: ViewType) => setView(v)}
            initialMode={loginMode}
          />
        )

      case 'perfil':
        if (!usuarioLogado) return <p>Acesso negado</p>
        return <Perfil usuario={usuarioLogado} onVoltar={() => setView('lista')} />

      case 'lista':
      default:
        return (
          <>
            <Banner />

            
            <CardList
              produtos={pd}
              onVerDetalhe={(p) => {
                setProdutoSelecionado(p)
                setView('detalhe')
              }}
            />

            
            <CardList
              produtos={pp}
              onVerDetalhe={(p) => {
                setProdutoSelecionado(p)
                setView('detalhe')
              }}
            />
          </>
        )
    }
  }, [view, produtoSelecionado, carrinho, usuarioLogado, loginMode])

  // NAVEGAÇÃO LOGIN
  const navigateToLogin = () => {
    setLoginMode('login')
    setView('login') // 'login' já faz parte de ViewType exportado
  }
  const navigateToCadastro = () => {
    setLoginMode('cadastro')
    setView('cadastro') // agora válido, porque usamos AppView
  }

  // CONTADOR DO CARRINHO
  const contagemCarrinho = useMemo(
    () => carrinho.reduce((acc, item) => acc + item.quantidade, 0),
    [carrinho]
  )

  return (
    <>
      <Header
        // Header provavelmente espera (v: ViewType) => void — então passamos um wrapper tipado
        onNavigate={(v: ViewType) => setView(v)}
        usuario={usuarioLogado}
        onLogout={onLogout}
        navigateToLogin={navigateToLogin}
        navigateToCadastro={navigateToCadastro}
        contagemCarrinho={contagemCarrinho}
      />

      <main>{CurrentView}</main>

      <Footer />
    </>
  )
}
