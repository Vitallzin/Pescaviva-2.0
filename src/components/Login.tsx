// src/components/Login.tsx
import React, { useState, useEffect } from 'react'
import type { ViewType } from '../data/produtos' // Importado do App.tsx

type LoginMode = 'login' | 'cadastro' // Importado do App.tsx

type Props = {
  onVoltar: () => void;
  onLogin: (email: string) => boolean;
  onNavigate: (view: ViewType) => void;
  initialMode: LoginMode; // NOVO: Define se começa como 'login' ou 'cadastro'
}

export default function Login({ onVoltar, onLogin, onNavigate, initialMode }: Props) {
  // Inicializa o estado 'isLogin' baseado na prop 'initialMode'
  const [isLogin, setIsLogin] = useState(initialMode === 'login'); 
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [nome, setNome] = useState('');

  // Efeito para resetar o modo se a prop 'initialMode' mudar (se o usuário clicar no header)
  useEffect(() => {
    setIsLogin(initialMode === 'login');
    // Opcional: Limpar os campos ao alternar o modo externo
    setEmail('');
    setSenha('');
    setNome('');
  }, [initialMode]) 

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLogin) {
      if(onLogin(email)) {
        // Sucesso
      } else {
        alert('E-mail ou senha incorretos. Tente novamente.');
      }
    } else {
      // Lógica de Cadastro (Visual/Mock)
      alert(`Usuário ${nome} cadastrado! Faça login com seu e-mail e senha.`);
      
      // Muda para a tela de login após o cadastro
      setEmail('');
      setSenha('');
      setNome('');
      setIsLogin(true); 
    }
  }
  
  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
    setEmail('');
    setSenha('');
    setNome('');
  }

  return (
    <main id="main-login">
      <button 
        className='btn-voltar-detalhe' 
        onClick={onVoltar} 
        style={{maxWidth:'400px', margin:'0 auto 20px', display:'block'}}
      >
        Voltar
      </button>

      <div className="login-container">
        <h2>{isLogin ? 'Entrar na Sua Conta' : 'Criar Nova Conta'}</h2>
        
        <form className="form-login" onSubmit={handleSubmit}>
          
          {!isLogin && (
            <div className="input-group">
              <label htmlFor="nome">Nome Completo</label>
              <input 
                id="nome"
                type="text" 
                placeholder="Seu nome"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                required={!isLogin}
              />
            </div>
          )}
          
          <div className="input-group">
            <label htmlFor="email">E-mail</label>
            <input 
              id="email"
              type="email" 
              placeholder="seu.email@exemplo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          
          <div className="input-group">
            <label htmlFor="senha">Senha</label>
            <input 
              id="senha"
              type="password" 
              placeholder="********"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="pv-btn-login">
            {isLogin ? 'Entrar' : 'Cadastrar'}
          </button>
        </form>

        <p className="toggle-auth">
          {isLogin ? 
            // Link de Cadastro na tela de Login
            <>Ainda não tem uma conta? <button type="button" onClick={toggleAuthMode} className="pv-btn-link">Crie uma aqui</button></>
            : 
            // Link de Login na tela de Cadastro
            <>Já tem uma conta? <button type="button" onClick={toggleAuthMode} className="pv-btn-link">Faça login</button></>
          }
        </p>
      </div>
    </main>
  )
}