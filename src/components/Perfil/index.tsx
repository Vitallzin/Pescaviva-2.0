// src/components/Perfil.tsx
import React from 'react';
import type { Usuario } from '../../data/produtos';
import './Perfil.css'; // Importa o CSS dedicado

type Props = {
    usuario: Usuario;
    onVoltar: () => void;
}

export default function Perfil({ usuario, onVoltar }: Props) {
    return (
        <main id="main-perfil" aria-label="Página de Perfil do Usuário">
            {/* Contêiner principal com a largura limitada */}
            <div className="perfil-container-main">
                
                {/* Botão de Voltar: Usa a classe global, mas com margem gerenciada pelo Perfil.css */}
                <button className='btn-voltar-detalhe' onClick={onVoltar} aria-label="Voltar para a página anterior">
                    Voltar
                </button>
                
                <h2>Meu Perfil: {usuario.nome}</h2>

                {/* Card de Informações */}
                <section className="perfil-card" aria-labelledby="perfil-info-titulo">
                    <img 
                        src={usuario.fotoUrl} 
                        alt={`Foto de perfil de ${usuario.nome}`} 
                        className="perfil-foto"
                        aria-hidden="true" // O nome já está no título principal
                    />
                    
                    <div className="perfil-info-box">
                        <h3 id="perfil-info-titulo">Informações da Conta</h3>
                        
                        {/* Uso de tags semânticas para lista de informações (Melhora a clareza) */}
                        <dl>
                            <dt><strong>Nome:</strong></dt>
                            <dd>{usuario.nome}</dd>
                            
                            <dt><strong>E-mail:</strong></dt>
                            <dd>{usuario.email}</dd>
                        </dl>

                        <p className="perfil-observacao">
                            * Aqui será a tela completa para editar dados, gerenciar anúncios e histórico de compras.
                        </p>
                    </div>
                </section>
                
                {/* Mock de Seções Adicionais (Apenas para demonstração de estrutura) */}
                <section style={{marginTop: '30px', padding: '20px', background: 'white', border: '1px solid #ddd', borderRadius: '8px'}} aria-labelledby="historico-titulo">
                    <h3 id="historico-titulo" style={{color: 'var(--pv-dark)'}}>Histórico de Compras (Mock)</h3>
                    <p style={{color: '#666'}}>Nenhuma compra registrada nos últimos 30 dias.</p>
                    <button className="pv-btn pv-btn-auth-ghost" style={{marginTop: '10px'}}>Ver Todos os Pedidos</button>
                </section>

            </div>
        </main>
    )
}