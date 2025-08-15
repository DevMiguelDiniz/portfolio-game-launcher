# Portfolio Game Launcher

Um portfólio pessoal que simula uma plataforma de jogos, inspirado na interface da Steam. Este projeto foi desenvolvido para apresentar projetos e habilidades de forma interativa e visualmente atraente.

## 🎮 Visão Geral

Este portfólio foi construído utilizando um design inspirado em plataformas de jogos, com uma interface escura, navegação intuitiva por abas e uma apresentação visual imersiva dos projetos e conquistas.

## ✨ Características Principais

- **Interface Estilo Game Launcher**: Visual inspirado na Steam com tema escuro e elementos de interface de jogos
- **Navegação por Abas**: Navegue facilmente entre Projetos, Perfil, Conquistas e Contato
- **Exibição de Projetos**: Visualize detalhes completos dos projetos, incluindo descrições, tecnologias, características e desafios
- **Sistema de Conquistas**: Acompanhe o progresso com um sistema de conquistas desbloqueáveis
- **Estatísticas Detalhadas**: Visualize estatísticas de tecnologias utilizadas e distribuição de projetos por categoria
- **Página de Contato Funcional**: Formulário de contato completo com validação

## 🛠️ Tecnologias Utilizadas

- **Next.js**: Framework React para renderização do lado do servidor
- **React**: Biblioteca para construção de interfaces
- **TypeScript**: Tipagem estática para JavaScript
- **Tailwind CSS**: Framework CSS utilitário para estilização
- **Lucide Icons**: Conjunto de ícones minimalistas
- **UI Components**: Componentes personalizados para botões, inputs e outros elementos

## 🚀 Instalação e Execução

```bash
# Clone o repositório
git clone https://github.com/DevMiguelDiniz/portfolio-game-launcher.git

# Entre no diretório do projeto
cd portfolio-game-launcher

# Instale as dependências
npm install

# Execute o servidor de desenvolvimento
npm run dev
```

Acesse `http://localhost:3000` para visualizar o portfólio no navegador.

## 📂 Estrutura do Projeto

- `/app`: Componentes principais e lógica da aplicação
  - `/components`: Componentes React reutilizáveis
  - `/data`: Dados dos projetos e outras informações
- `/components/ui`: Componentes de interface do usuário
- `/public`: Arquivos estáticos como imagens e ícones

```
portfolio-game-launcher/
├── app/                       # Lógica principal da aplicação
│   ├── page.tsx               # Página principal do aplicativo
│   ├── layout.tsx             # Layout principal da aplicação
│   ├── components/            # Componentes específicos da aplicação
│   │   ├── Header.tsx         # Barra de navegação superior
│   │   ├── Sidebar.tsx        # Barra lateral de navegação de projetos
│   │   ├── ProjectsView.tsx   # Visualização de projetos
│   │   ├── ProfileView.tsx    # Visualização do perfil
│   │   ├── ContactView.tsx    # Visualização de contato
│   │   ├── AchievementsView.tsx # Visualização de conquistas
│   │   ├── SplashScreen.tsx   # Tela de carregamento inicial
│   │   ├── ProjectModal.tsx   # Modal de detalhes de projeto
│   │   └── ProjectDetail.tsx  # Detalhes completos de projeto
│   └── data/                  # Dados estáticos da aplicação
│       └── projects.ts        # Lista de projetos
├── components/                # Componentes compartilhados
│   └── ui/                    # Componentes de interface do usuário
│       ├── button.tsx         # Componente de botão
│       ├── input.tsx          # Componente de entrada
│       └── ...                # Outros componentes UI
├── public/                    # Arquivos estáticos
│   ├── images/                # Imagens do projeto
│   │   └── projects/          # Imagens dos projetos
│   ├── preview.png            # Imagem de preview
│   └── ...                    # Outros arquivos estáticos
├── styles/                    # Estilos globais
│   └── globals.css            # Estilos CSS globais
├── package.json               # Dependências e scripts
├── next.config.js             # Configuração do Next.js
├── tailwind.config.js         # Configuração do Tailwind CSS
├── tsconfig.json              # Configuração do TypeScript
└── README.md                  # Documentação do projeto
```

## 🎯 Funcionalidades

### Página de Projetos
- Exibição de projetos em cards
- Detalhes completos de cada projeto (descrição, tecnologias, características)
- Navegação por categorias
- Links para demos e repositórios

### Perfil
- Informações pessoais e profissionais
- Resumo de habilidades e experiências

### Conquistas
- Sistema de conquistas desbloqueáveis
- Estatísticas de tecnologias utilizadas
- Distribuição de projetos por categorias
- Resumo de progresso

### Contato
- Formulário de contato funcional
- Informações de contato e disponibilidade

## 🎨 Design e Protótipo

O design do projeto foi desenvolvido no Figma, incluindo wireframes e protótipos interativos:

🔗 **[Visualizar Design no Figma](https://www.figma.com/design/4meOtxZAAWS5lbKGZdR4SZ/Portifolio?node-id=0-1&p=f&t=jExIcgTNILf8MtIL-0)**

## 🔍 Preview

![Preview do Portfolio Game Launcher](/public/preview.png)

## 🤝 Contribuição

Contribuições são bem-vindas! Para contribuir:

1. Faça um fork do projeto
2. Crie uma nova branch (`git checkout -b feature/nova-funcionalidade`)
3. Faça commit das suas alterações (`git commit -m 'Adiciona nova funcionalidade'`)
4. Envie para a branch (`git push origin feature/nova-funcionalidade`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença [MIT](LICENSE).

---

Desenvolvido por [Miguel Diniz](https://github.com/DevMiguelDiniz)