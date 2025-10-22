import { pescadora, pescador1, pescador2, pescador3, pescador4, pescador5, pescador6, pescador7, pescador8, pescador9, pescador10 } from '../assets'

import { anchova, atum, badejo, bagre, cacao, camarao, caranguejo, corvina, dourado, garoupa, lagosta, linguado, merluza, merzela, mexilhao, ostra, pacu, pargo, pescada, pintado, piracucu, polvo, robalo, salmao, sardinha, tainha, tambaqui, tilapia, traira } from '../assets';

export type ViewType = 'lista'|'detalhe'|'carrinho'|'notificacao'|'chat'|'publicar'|'login'|'perfil'
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
  fotoUrl: pescadora,
  email: 'maria@pescaviva.com.br',
}

export const produtosDestaque: Produto[] = [

  { 
    imagem: tilapia, 
    titulo: 'Tilápia', 
    descricao: 'Peixe de carne branca e sabor suave.', 
    preco: 'R$ 25,00/kg', 
    quantidade: 10, 
    vendedor: { 
        nome: 'João da Pesca', 
        foto: pescador1 
      }, 
    link: 'descricao' 
  },

  { 
    imagem: salmao, 
    titulo: 'Salmão', 
    descricao: 'Peixe rico em ômega-3.', 
    preco: 'R$ 80,00/kg', 
    quantidade: 8, 
    vendedor: { 
        nome: 'Maria do Mar', 
        foto: pescador2 
      }, 
    link: 'descricao' 
  },

  { 
    imagem: atum, 
    titulo: 'Atum', 
    descricao: 'Peixe de carne vermelha e sabor marcante.', 
    preco: 'R$ 60,00/kg', 
    quantidade: 5, 
    vendedor: { 
        nome: 'Pedro Pescador', 
        foto: pescador3 
      }, 
    link: 'descricao' 
  },

  { 
    imagem: piracucu, 
    titulo: 'Pirarucu', 
    descricao: 'Peixe amazônico de carne branca.', 
    preco: 'R$ 45,00/kg', 
    quantidade: 7, 
    vendedor: { 
        nome: 'Ana da Amazônia', 
        foto: pescador4
      }, 
    link: 'descricao' 
  },

  { 
    imagem: tambaqui, 
    titulo: 'Tambaqui', 
    descricao: 'Peixe amazônico de sabor único.',
    preco: 'R$ 35,00/kg', 
    quantidade: 9, 
    vendedor: { 
        nome: 'Lucas Rio', 
        foto: pescador5
      }, 
    link: 'descricao' 
  },

  { 
    imagem: pacu, 
    titulo: 'Pacu', 
    descricao: 'Peixe de água doce com carne saborosa.', 
    preco: 'R$ 30,00/kg', 
    quantidade: 6, 
    vendedor: { 
        nome: 'Carla Lago', 
        foto: pescador6
      }, 
    link: 'descricao' 
  },

  { 
    imagem: dourado, 
    titulo: 'Dourado', 
    descricao: 'Peixe de água doce com carne firme.', 
    preco: 'R$ 50,00/kg', 
    quantidade: 4, 
    vendedor: { 
        nome: 'Fernando da Água', 
        foto: pescador7
      }, 
    link: 'descricao' 
  },

  { 
    imagem: traira, 
    titulo: 'Traíra', 
    descricao: 'Peixe de água doce com carne saborosa.', 
    preco: 'R$ 28,00/kg', 
    quantidade: 10, 
    vendedor: { 
        nome: 'Beatriz do Córrego', 
        foto: pescador8
      }, 
    link: 'descricao' 
  },

  { 
    imagem: caranguejo, 
    titulo: 'Caranguejo', 
    descricao: 'Crustáceo de carne saborosa.', 
    preco: 'R$ 40,00/kg', 
    quantidade: 3, 
    vendedor: { 
        nome: 'Roberto das Conchas', 
        foto: pescador9 
      }, 
    link: 'descricao' 
  },

  { 
    imagem: camarao, 
    titulo: 'Camarão', 
    descricao: 'Crustáceo versátil na culinária.', 
    preco: 'R$ 70,00/kg', 
    quantidade: 5, 
    vendedor: { 
        nome: 'Sandra dos Frutos', 
        foto:  pescador10
      }, 
    link: 'descricao' 
  },

  { 
    imagem: polvo, 
    titulo: 'Polvo', 
    descricao: 'Muito usado na culinária mediterrânea', 
    preco: 'R$ 95,00/kg', 
    quantidade: 2, 
    vendedor: { 
        nome: 'Guilherme Submarino', 
        foto: pescador1 
      }, 
    link: 'descricao' 
  },

  { 
    imagem: ostra, 
    titulo: 'Ostra', 
    descricao: 'Delicada e fresca', 
    preco: 'R$ 80,00/kg', 
    quantidade: 6, 
    vendedor: { 
        nome: 'Mariana da Praia', 
        foto: pescador2 
      }, 
    link: 'descricao' 
  },

  { 
    imagem: lagosta, 
    titulo: 'Lagosta', 
    descricao: 'Fruto do mar nobre e caro', 
    preco: 'R$ 160,00/kg', 
    quantidade: 1, 
    vendedor: { 
        nome: 'Ricardo do Alto Mar', 
        foto: pescador3
      }, 
    link: 'descricao' 
  },

  { 
    imagem: badejo, 
    titulo: 'Badejo', 
    descricao: 'Peixe muito apreciado em restaurantes', 
    preco: 'R$ 88,00/kg', 
    quantidade: 4, 
    vendedor: { 
        nome: 'Patrícia do Porto', 
        foto: pescador4
      }, 
    link: 'descricao' 
  },

  { 
    imagem: merzela, 
    titulo: 'Merzela', 
    descricao: 'Peixe muito apreciado em restaurantes', 
    preco: 'R$ 68,00/kg', 
    quantidade: 9, 
    vendedor: { 
        nome: 'Maria Pescadora', 
        foto: pescadora
      }, 
    link: 'descricao' 
  },

  { 
    imagem: mexilhao, 
    titulo: 'Mexilhao', 
    descricao: 'Peixe muito apreciado em restaurantes', 
    preco: 'R$ 108,00/kg', 
    quantidade: 4, 
    vendedor: { 
        nome: 'Fernanda das Redes', 
        foto: pescador1
      }, 
    link: 'descricao' 
  }
]

export const peixesPerto: Produto[] = [

  { 
    imagem: anchova, 
    titulo: 'Anchova', 
    descricao: 'Peixe de carne branca e saborosa', 
    preco: 'R$ 45,00/kg', 
    quantidade: 7, 
    vendedor: { 
        nome: 'Cesar da Costa', 
        foto: pescador5 
      }, 
    link: 'descricao' 
  },

  { 
    imagem: bagre, 
    titulo: 'Bagre', 
    descricao: 'Peixe de água doce, ideal para fritura', 
    preco: 'R$ 30,00/kg', 
    quantidade: 9, 
    vendedor: { 
        nome: 'Bruno do Riacho', 
        foto: pescador6 
      }, 
    link: 'descricao' 
  },

  { 
    imagem: linguado, 
    titulo: 'Linguado', 
    descricao: 'Peixe nobre de carne macia', 
    preco: 'R$ 85,00/kg', 
    quantidade: 3, 
    vendedor: { 
        nome: 'Sofia da Pescaria', 
        foto: pescador7
      }, 
    link: 'descricao' 
  },

  { 
    imagem: pintado, 
    titulo: 'Pintado', 
    descricao: 'Popular na culinária brasileira', 
    preco: 'R$ 50,00/kg', 
    quantidade: 6, 
    vendedor: { 
        nome: 'Thiago dos Lagos', 
        foto: pescador8
      }, 
    link: 'descricao' 
  },

  { 
    imagem: robalo, 
    titulo: 'Robalo', 
    descricao: 'Peixe de carne firme e delicada', 
    preco: 'R$ 90,00/kg', 
    quantidade: 4, 
    vendedor: { 
        nome: 'Julia da Lagoa', 
        foto: pescador9 
      }, 
    link: 'descricao' 
  },

  { 
    imagem: corvina, 
    titulo: 'Corvina',
    descricao: 'Ótimo para moquecas', 
    preco: 'R$ 40,00/kg', 
    quantidade: 8, 
    vendedor: { 
        nome: 'Gabriel do Mar', 
        foto: pescador10 
      }, 
    link: 'descricao' 
  },

  { 
    imagem: sardinha, 
    titulo: 'Sardinha', 
    descricao: 'Peixe barato e nutritivo', 
    preco: 'R$ 18,00/kg', 
    quantidade: 10, 
    vendedor: { 
        nome: 'Fernanda das Redes', 
        foto: pescador1
      }, 
    link: 'descricao' 
  },

  { 
    imagem: pescada, 
    titulo: 'Pescada', 
    descricao: 'Carne leve e versátil', 
    preco: 'R$ 35,00/kg', 
    quantidade: 5, 
    vendedor: { 
        nome: 'Rafael do Barco', 
        foto: pescador2
      }, 
    link: 'descricao' 
  },

  { 
    imagem: pargo, 
    titulo: 'Pargo', 
    descricao: 'Peixe branco de sabor suave', 
    preco: 'R$ 60,00/kg', 
    quantidade: 3, 
    vendedor: { 
      nome: 'Larissa do Coral', 
      foto: pescador3
      }, 
    link: 'descricao' 
  },

  { 
    imagem: garoupa, 
    titulo: 'Garoupa', 
    descricao: 'Peixe nobre e suculento', 
    preco: 'R$ R$ 95,00/kg', 
    quantidade: 2, 
    vendedor: { 
      nome: 'Daniel das Rochas', 
      foto: pescador4 
      }, 
    link: 'descricao' 
   },

  { 
    imagem: merluza, 
    titulo: 'Merluza', 
    descricao: 'Peixe de carne branca e macia', 
    preco: 'R$ 38,00/kg', 
    quantidade: 7, 
    vendedor: { 
      nome: 'Camila da Maré', 
      foto: pescador5 
      }, 
    link: 'descricao' 
  },

  { 
    imagem: cacao, 
    titulo: 'Cação', 
    descricao: 'Peixe ideal para moquecas', 
    preco: 'R$ 42,00/kg', 
    quantidade: 6, 
    vendedor: { 
      nome: 'Felipe do Mangue', 
      foto: pescador6
      }, 
    link: 'descricao' 
  },

  { 
    imagem: tainha, 
    titulo: 'Tainha', 
    descricao: 'Muito comum em regiões costeiras', 
    preco: 'R$ 28,00/kg', 
    quantidade: 9, 
    vendedor: { 
      nome: 'Vitória do Estuário', 
      foto: pescador7 
      }, 
    link: 'descricao' 
  }
]