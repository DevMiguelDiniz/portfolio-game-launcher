export const projects = [
  {
    id: '1',
    title: 'E-commerce Platform',
    description: 'Plataforma completa de e-commerce com carrinho, pagamentos e dashboard administrativo.',
    longDescription: 'Uma plataforma de e-commerce completa desenvolvida com Next.js e Node.js, incluindo sistema de autenticação, carrinho de compras, integração com gateway de pagamento, dashboard administrativo e muito mais. O projeto foi desenvolvido com foco na performance, segurança e experiência do usuário.',
    image: '/placeholder.svg?height=400&width=600&text=E-commerce+Platform',
    category: 'fullstack',
    technologies: ['Next.js', 'TypeScript', 'Node.js', 'PostgreSQL', 'Stripe', 'Tailwind CSS', 'Prisma', 'NextAuth'],
    githubUrl: 'https://github.com/usuario/ecommerce',
    liveUrl: 'https://ecommerce-demo.vercel.app',
    featured: true,
    date: 'Dezembro 2023',
    features: [
      'Sistema completo de autenticação e autorização',
      'Carrinho de compras com persistência',
      'Integração com Stripe para pagamentos',
      'Dashboard administrativo completo',
      'Sistema de avaliações e comentários',
      'Busca avançada com filtros',
      'Gestão de estoque em tempo real',
      'Notificações por email'
    ],
    challenges: [
      'Implementação de sistema de pagamentos seguro com Stripe',
      'Otimização de performance para grandes catálogos de produtos',
      'Criação de dashboard responsivo e intuitivo para administradores',
      'Sincronização de estoque em tempo real'
    ]
  },
  {
    id: '2',
    title: 'Task Management App',
    description: 'Aplicativo de gerenciamento de tarefas com colaboração em tempo real.',
    longDescription: 'Aplicativo de produtividade para gerenciamento de tarefas e projetos, com funcionalidades de colaboração em tempo real, notificações push e sincronização entre dispositivos.',
    image: '/placeholder.svg?height=400&width=600&text=Task+Management+App',
    category: 'web',
    technologies: ['React', 'Firebase', 'Material-UI', 'PWA', 'WebSockets'],
    githubUrl: 'https://github.com/usuario/task-manager',
    liveUrl: 'https://task-manager-demo.vercel.app',
    date: 'Novembro 2023',
    features: [
      'Colaboração em tempo real entre equipes',
      'Notificações push inteligentes',
      'Modo offline com sincronização automática',
      'Drag and drop para organização intuitiva',
      'Relatórios de produtividade detalhados',
      'Integração com calendários externos'
    ],
    challenges: [
      'Sincronização de dados em tempo real entre múltiplos usuários',
      'Implementação de modo offline robusto',
      'Otimização de performance para grandes volumes de dados'
    ]
  },
  {
    id: '3',
    title: 'Weather App',
    description: 'Aplicativo mobile de previsão do tempo com design moderno e animações.',
    longDescription: 'Aplicativo mobile elegante para previsão do tempo, desenvolvido com React Native e Expo. Inclui animações fluidas, localização automática e interface intuitiva.',
    image: '/placeholder.svg?height=400&width=600&text=Weather+App',
    category: 'mobile',
    technologies: ['React Native', 'Expo', 'OpenWeather API', 'Lottie', 'AsyncStorage'],
    githubUrl: 'https://github.com/usuario/weather-app',
    date: 'Outubro 2023',
    features: [
      'Previsão do tempo em tempo real',
      'Localização automática GPS',
      'Animações fluidas com Lottie',
      'Suporte a múltiplas cidades',
      'Notificações de alertas meteorológicos',
      'Interface adaptativa para diferentes climas'
    ],
    challenges: [
      'Integração com APIs de geolocalização',
      'Otimização de animações para performance mobile',
      'Implementação de notificações push nativas'
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
    date: 'Setembro 2023',
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
    title: 'Chat Application',
    description: 'Aplicação de chat em tempo real com salas e mensagens privadas.',
    longDescription: 'Aplicação de chat completa desenvolvida com Socket.io e React, incluindo salas públicas, mensagens privadas, compartilhamento de arquivos e sistema de moderação.',
    image: '/placeholder.svg?height=400&width=600&text=Chat+Application',
    category: 'fullstack',
    technologies: ['Socket.io', 'Node.js', 'React', 'MongoDB', 'JWT', 'Redis'],
    githubUrl: 'https://github.com/usuario/chat-app',
    liveUrl: 'https://chat-demo.vercel.app',
    featured: true,
    date: 'Agosto 2023',
    features: [
      'Chat em tempo real com Socket.io',
      'Salas públicas e mensagens privadas',
      'Compartilhamento de arquivos e imagens',
      'Sistema de moderação avançado',
      'Emojis e reações personalizadas',
      'Histórico de mensagens persistente'
    ],
    challenges: [
      'Escalabilidade para milhares de usuários simultâneos',
      'Implementação de sistema de moderação em tempo real',
      'Otimização de performance com Redis para cache'
    ]
  },
  {
    id: '6',
    title: 'Fitness Tracker',
    description: 'App mobile para acompanhamento de exercícios e metas fitness.',
    longDescription: 'Aplicativo mobile completo para acompanhamento de atividades físicas, desenvolvido com Flutter. Inclui tracking de exercícios, metas personalizadas e gráficos de progresso.',
    image: '/placeholder.svg?height=400&width=600&text=Fitness+Tracker',
    category: 'mobile',
    technologies: ['Flutter', 'Dart', 'SQLite', 'Charts', 'HealthKit', 'Google Fit'],
    githubUrl: 'https://github.com/usuario/fitness-tracker',
    date: 'Julho 2023',
    features: [
      'Tracking automático de exercícios',
      'Metas personalizadas e gamificação',
      'Gráficos detalhados de progresso',
      'Integração com Apple Health e Google Fit',
      'Planos de treino personalizados',
      'Comunidade e desafios entre amigos'
    ]
  }
]
