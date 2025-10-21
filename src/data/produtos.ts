// src/data/produtos.ts

// Tipos de Navegação da Aplicação (NOVOS TIPOS EXPORTADOS)
export type ViewType = 'lista'|'detalhe'|'carrinho'|'notificacao'|'chat'|'publicar'|'login'|'perfil' // <-- NOVO: 'perfil'
export type LoginMode = 'login' | 'cadastro'

export type Produto = {
  imagem: string
  titulo: string
  descricao: string
  preco: string
  quantidade: number
  local?: string
  data?: string
  vendedor?: { nome: string; foto?: string }
  link?: string
}

// Tipo de Usuário (Centralizado)
export type Usuario = {
  id: string;
  nome: string;
  fotoUrl: string;
  email: string;
}

// Usuário Mock (Centralizado)
export const MOCK_USER: Usuario = {
  id: 'user_001',
  nome: 'Maria Pescadora',
  fotoUrl: 'assets/img/pescadores/pescadora.jpg', // Foto temporária
  email: 'maria@pescaviva.com.br',
}

export const produtosDestaque: Produto[] = [
  { imagem: 'assets/img/peixes/tilapia.jpeg', titulo: 'Tilápia', descricao: 'Peixe de carne branca e sabor suave.', preco: 'R$ 25,00/kg', quantidade: 10, vendedor: { nome: 'João da Pesca', foto: 'assets/img/pescadores/pescador1.jpeg' }, link: 'descricao' },
  { imagem: 'assets/img/peixes/salmao.jpeg', titulo: 'Salmão', descricao: 'Peixe rico em ômega-3.', preco: 'R$ 80,00/kg', quantidade: 8, vendedor: { nome: 'Maria do Mar', foto: 'assets/img/pescadores/pescador2.jpeg' }, link: 'descricao' },
  { imagem: 'assets/img/peixes/atum.jpeg', titulo: 'Atum', descricao: 'Peixe de carne vermelha e sabor marcante.', preco: 'R$ 60,00/kg', quantidade: 5, vendedor: { nome: 'Pedro Pescador', foto: 'assets/img/pescadores/pescador3.jpeg' }, link: 'descricao' },
  { imagem: 'assets/img/peixes/piracucu.jpeg', titulo: 'Pirarucu', descricao: 'Peixe amazônico de carne branca.', preco: 'R$ 45,00/kg', quantidade: 7, vendedor: { nome: 'Ana da Amazônia', foto: 'assets/img/pescadores/pescador4.jpeg' }, link: 'descricao' },
  { imagem: 'assets/img/peixes/tambaqui.jpeg', titulo: 'Tambaqui', descricao: 'Peixe amazônico de sabor único.', preco: 'R$ 35,00/kg', quantidade: 9, vendedor: { nome: 'Lucas Rio', foto: 'assets/img/pescadores/pescador5.jpeg' }, link: 'descricao' },
  { imagem: 'assets/img/peixes/pacu.jpeg', titulo: 'Pacu', descricao: 'Peixe de água doce com carne saborosa.', preco: 'R$ 30,00/kg', quantidade: 6, vendedor: { nome: 'Carla Lago', foto: 'assets/img/pescadores/pescador6.jpeg' }, link: 'descricao' },
  { imagem: 'assets/img/peixes/dourado.jpeg', titulo: 'Dourado', descricao: 'Peixe de água doce com carne firme.', preco: 'R$ 50,00/kg', quantidade: 4, vendedor: { nome: 'Fernando da Água', foto: 'assets/img/pescadores/pescador7.jpeg' }, link: 'descricao' },
  { imagem: 'assets/img/peixes/traira.jpeg', titulo: 'Traíra', descricao: 'Peixe de água doce com carne saborosa.', preco: 'R$ 28,00/kg', quantidade: 10, vendedor: { nome: 'Beatriz do Córrego', foto: 'assets/img/pescadores/pescador8.jpeg' }, link: 'descricao' },
  { imagem: 'assets/img/peixes/caranguejo.jpeg', titulo: 'Caranguejo', descricao: 'Crustáceo de carne saborosa.', preco: 'R$ 40,00/kg', quantidade: 3, vendedor: { nome: 'Roberto das Conchas', foto: 'assets/img/pescadores/pescador9.jpeg' }, link: 'descricao' },
  { imagem: 'assets/img/peixes/camarao.jpeg', titulo: 'Camarão', descricao: 'Crustáceo versátil na culinária.', preco: 'R$ 70,00/kg', quantidade: 5, vendedor: { nome: 'Sandra dos Frutos', foto: 'assets/img/pescadores/pescador10.jpeg' }, link: 'descricao' },
  { imagem: 'assets/img/peixes/polvo.jpeg', titulo: 'Polvo', descricao: 'Muito usado na culinária mediterrânea', preco: 'R$ 95,00/kg', quantidade: 2, vendedor: { nome: 'Guilherme Submarino', foto: 'assets/img/pescadores/pescador1.jpeg' }, link: 'descricao' },
  { imagem: 'assets/img/peixes/ostra.jpeg', titulo: 'Ostra', descricao: 'Delicada e fresca', preco: 'R$ 80,00/kg', quantidade: 6, vendedor: { nome: 'Mariana da Praia', foto: 'assets/img/pescadores/pescador2.jpeg' }, link: 'descricao' },
  { imagem: 'assets/img/peixes/lagosta.jpeg', titulo: 'Lagosta', descricao: 'Fruto do mar nobre e caro', preco: 'R$ 160,00/kg', quantidade: 1, vendedor: { nome: 'Ricardo do Alto Mar', foto: 'assets/img/pescadores/pescador3.jpeg' }, link: 'descricao' },
  { imagem: 'assets/img/peixes/badejo.jpeg', titulo: 'Badejo', descricao: 'Peixe muito apreciado em restaurantes', preco: 'R$ 88,00/kg', quantidade: 4, vendedor: { nome: 'Patrícia do Porto', foto: 'assets/img/pescadores/pescador4.jpeg' }, link: 'descricao' }
]

export const peixesPerto: Produto[] = [
  { imagem: 'assets/img/peixes/anchova.jpeg', titulo: 'Anchova', descricao: 'Peixe de carne branca e saborosa', preco: 'R$ 45,00/kg', quantidade: 7, vendedor: { nome: 'Cesar da Costa', foto: 'assets/img/pescadores/pescador5.jpeg' }, link: 'descricao' },
  { imagem: 'assets/img/peixes/bagre.jpeg', titulo: 'Bagre', descricao: 'Peixe de água doce, ideal para fritura', preco: 'R$ 30,00/kg', quantidade: 9, vendedor: { nome: 'Bruno do Riacho', foto: 'assets/img/pescadores/pescador6.jpeg' }, link: 'descricao' },
  { imagem: 'assets/img/peixes/linguado.jpeg', titulo: 'Linguado', descricao: 'Peixe nobre de carne macia', preco: 'R$ 85,00/kg', quantidade: 3, vendedor: { nome: 'Sofia da Pescaria', foto: 'assets/img/pescadores/pescador7.jpeg' }, link: 'descricao' },
  { imagem: 'assets/img/peixes/pintado.jpeg', titulo: 'Pintado', descricao: 'Popular na culinária brasileira', preco: 'R$ 50,00/kg', quantidade: 6, vendedor: { nome: 'Thiago dos Lagos', foto: 'assets/img/pescadores/pescador8.jpeg' }, link: 'descricao' },
  { imagem: 'assets/img/peixes/robalo.jpeg', titulo: 'Robalo', descricao: 'Peixe de carne firme e delicada', preco: 'R$ 90,00/kg', quantidade: 4, vendedor: { nome: 'Julia da Lagoa', foto: 'assets/img/pescadores/pescador9.jpeg' }, link: 'descricao' },
  { imagem: 'assets/img/peixes/corvina.jpeg', titulo: 'Corvina', descricao: 'Ótimo para moquecas', preco: 'R$ 40,00/kg', quantidade: 8, vendedor: { nome: 'Gabriel do Mar', foto: 'assets/img/pescadores/pescador10.jpeg' }, link: 'descricao' },
  { imagem: 'assets/img/peixes/sardinha.jpeg', titulo: 'Sardinha', descricao: 'Peixe barato e nutritivo', preco: 'R$ 18,00/kg', quantidade: 10, vendedor: { nome: 'Fernanda das Redes', foto: 'assets/img/pescadores/pescador1.jpeg' }, link: 'descricao' },
  { imagem: 'assets/img/peixes/pescada.jpeg', titulo: 'Pescada', descricao: 'Carne leve e versátil', preco: 'R$ 35,00/kg', quantidade: 5, vendedor: { nome: 'Rafael do Barco', foto: 'assets/img/pescadores/pescador2.jpeg' }, link: 'descricao' },
  { imagem: 'assets/img/peixes/pargo.jpeg', titulo: 'Pargo', descricao: 'Peixe branco de sabor suave', preco: 'R$ 60,00/kg', quantidade: 3, vendedor: { nome: 'Larissa do Coral', foto: 'assets/img/pescadores/pescador3.jpeg' }, link: 'descricao' },
  { imagem: 'assets/img/peixes/garoupa.jpeg', titulo: 'Garoupa', descricao: 'Peixe nobre e suculento', preco: 'R$ R$ 95,00/kg', quantidade: 2, vendedor: { nome: 'Daniel das Rochas', foto: 'assets/img/pescadores/pescador4.jpeg' }, link: 'descricao' },
  { imagem: 'assets/img/peixes/merluza.jpeg', titulo: 'Merluza', descricao: 'Peixe de carne branca e macia', preco: 'R$ 38,00/kg', quantidade: 7, vendedor: { nome: 'Camila da Maré', foto: 'assets/img/pescadores/pescador5.jpeg' }, link: 'descricao' },
  { imagem: 'assets/img/peixes/cacao.jpeg', titulo: 'Cação', descricao: 'Peixe ideal para moquecas', preco: 'R$ 42,00/kg', quantidade: 6, vendedor: { nome: 'Felipe do Mangue', foto: 'assets/img/pescadores/pescador6.jpeg' }, link: 'descricao' },
  { imagem: 'assets/img/peixes/tainha.jpeg', titulo: 'Tainha', descricao: 'Muito comum em regiões costeiras', preco: 'R$ 28,00/kg', quantidade: 9, vendedor: { nome: 'Vitória do Estuário', foto: 'assets/img/pescadores/pescador7.jpeg' }, link: 'descricao' }
]