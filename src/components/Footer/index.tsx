import React from 'react'
import './Footer.css' // Importa os estilos dedicados

export default function Footer() {
    return (
        // Uso da tag semântica <footer>
        <footer id="pv-footer" role="contentinfo" aria-label="Rodapé do Site">
            <div className="pv-footer-inner">
                {/* Coluna 1: Navegação */}
                <div className="pv-footer-col">
                    <h4>Navegação</h4>
                    <a href="#" className="pv-footer-link">Home</a>
                    <a href="#" className="pv-footer-link">Anuncie (Publicar)</a>
                    <a href="#" className="pv-footer-link">Carrinho</a>
                    <a href="#" className="pv-footer-link">Minha Conta</a>
                </div>

                {/* Coluna 2: Redes Sociais */}
                <div className="pv-footer-col">
                    <h4>Redes Sociais</h4>
                    <a href="#" target="_blank" rel="noreferrer" className="pv-footer-link">Facebook</a>
                    <a href="https://www.instagram.com/app.pescaviva/" target="_blank" rel="noreferrer" className="pv-footer-link">Instagram</a>
                </div>
                
                {/* Coluna 3: Contato */}
                <div className="pv-footer-col">
                    <h4>Contato</h4>
                    <div className="pv-footer-info"><a href="#" className="pv-footer-link-info">contato@pescaviva.com.br</a></div>
                    <div className="pv-footer-info"><a href="#" className="pv-footer-link-info">(00) 9 9999-9999</a></div>
                    <div className="pv-footer-info">Rua dos Navegantes, 145 – Bairro Costa Azul</div>
                </div>
                
                {/* Coluna 4: Sobre */}
                <div className="pv-footer-col pv-footer-sobre">
                    <h4>Sobre</h4>
                    <p>A Pescaviva conecta pescadores diretamente a você, garantindo peixes mais frescos e preços justos. Nossa plataforma facilita a compra e venda de pescados de forma sustentável e transparente.</p>
                </div>
            </div>

            {/* Direitos Autorais e Créditos */}
            <div className="pv-footer-copy">
                <p>&copy; {new Date().getFullYear()} Pescaviva. Todos os direitos reservados.</p>
            </div>
        </footer>
    )
}