// src/components/Perfil.tsx
import React from 'react';
import type { Usuario } from '../data/produtos';

type Props = {
    usuario: Usuario;
    onVoltar: () => void;
}

export default function Perfil({ usuario, onVoltar }: Props) {
    return (
        <main id="main-perfil">
            <div className="container-main" style={{maxWidth: 800}}>
                <button className='btn-voltar-detalhe' onClick={onVoltar} style={{marginBottom: '20px'}}>
                    Voltar
                </button>
                <h2>Meu Perfil ({usuario.nome})</h2>

                <div className="perfil-card" style={{border: '1px solid #ddd', padding: '30px', borderRadius: '10px', background: 'white', display: 'flex', gap: '20px', alignItems: 'center'}}>
                    <img 
                        src={usuario.fotoUrl} 
                        alt={usuario.nome} 
                        style={{width: '100px', height: '100px', borderRadius: '50%', objectFit: 'cover', border: '3px solid var(--pv-primary)'}}
                    />
                    <div>
                        <h3>Informações da Conta</h3>
                        <p><strong>Nome:</strong> {usuario.nome}</p>
                        <p><strong>E-mail:</strong> {usuario.email}</p>
                        <p style={{marginTop: '15px', color: '#666', fontSize: '0.9em'}}>
                            * Aqui será a tela completa para editar dados, gerenciar anúncios e histórico de compras.
                        </p>
                    </div>
                </div>
            </div>
        </main>
    );
}