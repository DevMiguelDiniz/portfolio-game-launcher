export const projects = [
  {
    id: '1',
    title: 'PetTrail',
    description: 'Plataforma mobile e web estilo Uber para passeios de pets.',
    longDescription: 'PetTrail é uma plataforma fullstack estilo Uber para passeios de pets, composta por um app mobile em Flutter, um dashboard web em Next.js e um backend em NestJS com arquitetura orientada a microsserviços. Possui autenticação segura, painel administrativo, sistema de avaliações e comunicação assíncrona entre serviços via message broker.',
    image: '/pettrail.jpeg?height=400&width=600&text=PetTrail',
    category: 'fullstack',
    technologies: ['Next.js', 'TypeScript', 'NestJS', 'Flutter', 'Dart', 'PostgreSQL', 'RabbitMQ', 'Docker', 'GitHub Actions'],
    githubUrl: 'https://github.com/DevMiguelDiniz/pmg-es-2026-1-ti5-6904100-pet-trail',
    videoUrl: '',
    liveUrl: '',
    featured: true,
    date: 'Junho 2026',
    features: [
      'App mobile em Flutter para tutores e passeadores',
      'Dashboard web administrativo em Next.js',
      'Sistema completo de autenticação e autorização',
      'Comunicação assíncrona entre 2 serviços via message broker (RabbitMQ)',
      'Sistema de avaliações e comentários',
      'CI/CD completo com GitHub Actions',
    ],
    challenges: [
      'Arquitetura multi-plataforma com backend compartilhado entre web e mobile',
      'Implementação de comunicação assíncrona entre microsserviços via RabbitMQ',
      'Pipeline de deploy automatizado cobrindo todos os serviços da plataforma',
    ]
  },
  {
    id: '2',
    title: 'Fabiana Moveis',
    description: 'Aplicação para gerenciamento de rotas e entregas.',
    longDescription: 'Fabiana Moveis é uma aplicação desenvolvida para otimizar o gerenciamento de rotas e entregas, utilizando tecnologias modernas como Next.js e Node.js. A plataforma permite que usuários gerenciem suas entregas de forma eficiente, com funcionalidades de rastreamento em tempo real e notificações.',
    image: '/FabianaMoveis.jpeg?height=400&width=600&text=Chat+Application',
    category: 'fullstack',
    technologies: ['Next.js', 'Node.js', 'TypeScript', 'PostgreSQL', 'Tailwind CSS', 'Nest.JS'],
    featured: true,
    githubUrl: 'https://github.com/DevMiguelDiniz/pmg-es-2025-1-ti3-9577100-fabiana-moveis.git',
      videoUrl: 'https://www.youtube.com/watch?v=4R1hQCg9AQ8',
    liveUrl: '',
    date: 'Julho 2025',
    features: [
      'Interface de usuário intuitiva e responsiva',
      'Sistema de gerenciamento de rotas e entregas',
      'Funcionalidade de rastreamento em tempo real',
      'Sistema de notificações para atualizações de entrega',
      'Painel administrativo para gerenciamento de usuários e entregas',
      'Geração de rotas otimizadas com base em localização',
    ],
    challenges: [
      'Implementação de um sistema de rastreamento em tempo real eficiente',
      'Gerenciamento de estado da aplicação sem bibliotecas externas',
      'Criação de uma interface responsiva que funcione bem em dispositivos móveis'
    ]
  },
  {
    id: '3',
    title: 'Java Parks',
    description: 'Aplicativo desktop em Java para gestão de estacionamento.',
    longDescription: 'Aplicativo desktop desenvolvido em Java para gestão de estacionamento, com funcionalidades como controle de entradas e saídas, relatórios de uso e integração com banco de dados.',
    image: '/XulambsPark.jpeg?height=400&width=600&text=Weather+App',
    category: 'desktop',
    technologies: ['Java', 'JavaFX', 'PostgreSQL'],
    githubUrl: 'https://github.com/DevMiguelDiniz/turmamanha-g2-x-men-evolution',
    date: 'Dezembro 2024',
    features: [
        'Interface gráfica intuitiva com JavaFX',
        'Controle de entradas e saídas de veículos',
        'Relatórios de uso e estatísticas',
        'Integração com banco de dados PostgreSQL',
        'Sistema de autenticação de usuários',
        'Suporte a múltiplos idiomas'
    ],
    challenges: [
        'Desenvolvimento de uma interface gráfica responsiva e intuitiva',
        'Gerenciamento eficiente de conexões com o banco de dados',
        'Implementação de funcionalidades avançadas como relatórios e estatísticas'
    ]
  },
  {
    id: '4',
    title: 'Portfolio Website',
    description: 'Site de portfólio responsivo com animações e design moderno.',
    longDescription: 'Website de portfólio pessoal desenvolvido com Next.js, featuring animações suaves, design responsivo e otimização para SEO.',
    image: '/placeholder.svg?height=400&width=600&text=Portfolio+Website',
    category: 'frontend',
    technologies: ['Next.js', 'Framer Motion', 'Tailwind CSS', 'TypeScript', 'MDX'],
    githubUrl: 'https://github.com/usuario/portfolio',
    liveUrl: 'https://portfolio-demo.vercel.app',
    date: 'Agosto 2025',
    features: [
      'Design responsivo e moderno',
      'Animações suaves com Framer Motion',
      'Sistema de blog integrado com MDX',
      'Otimização completa para SEO',
      'Formulário de contato funcional',
      'Modo escuro/claro'
    ]
  },
  {
    id: '5',
    title: 'Gnosi',
    description: 'Plataforma completa de cadastro e gestão de cursos online.',
    longDescription: 'Gnosi é uma plataforma robusta para criação e gestão de cursos online, desenvolvida com React.js e SpringBoot. Oferece funcionalidades avançadas como autenticação segura, painel administrativo, e um sistema de avaliações.',
    image: '/Gnosi.jpeg?height=400&width=600&text=Gnosi+Platform',
    category: 'fullstack',
    technologies: ['React.js', 'TypeScript', 'Node.js', 'PostgreSQL', 'Springboot', 'Tailwind CSS', 'SpringSecurity', 'Java'],
    githubUrl: 'https://github.com/DevMiguelDiniz/pmg-es-2024-2-ti2-3687100-gnosi',
    videoUrl: 'https://www.youtube.com/watch?v=dG2RQ9XAAqE',
    liveUrl: '',
    featured: true,
    date: 'Dezembro 2024',
    features: [
      'Sistema completo de autenticação e autorização',
      'Dashboard administrativo completo',
      'Sistema de avaliações e comentários',
      'Busca avançada com filtros',
    ],
    challenges: [
      'Criação de dashboard responsivo e intuitivo para administradores',
    ]
  },
  {
    id: '6',
    title: 'CookConnect',
    description: 'Aplicação frontend para compartilhamento de receitas culinárias.',
    longDescription: 'CookConnect é uma aplicação frontend desenvolvida com HTML5, CSS e JavaScript puro, permitindo que usuários compartilhem e descubram receitas culinárias. A plataforma inclui funcionalidades de busca avançada, comentários e avaliações de receitas.',
    image: '/CookConnect.png?height=400&width=600&text=Chat+Application',
    category: 'fullstack',
    technologies: ['HTML5', 'CSS', 'JavaScript'],
    githubUrl: 'https://github.com/DevMiguelDiniz/pmg-es-2024-1-ti1-2010100-cook-connect',
    liveUrl: '',
    date: 'Julho 2024',
    features: [
        'Interface de usuário intuitiva e responsiva',
        'Sistema de busca avançada por ingredientes e categorias',
        'Funcionalidade de comentários e avaliações de receitas',
        'Sistema de autenticação de usuários',
        'Painel administrativo para moderação de conteúdo',
    ],
    challenges: [
        'Implementação de um sistema de busca eficiente e rápido',
        'Gerenciamento de estado da aplicação sem bibliotecas externas',
        'Criação de uma interface responsiva que funcione bem em dispositivos móveis'
    ]
  }
]
