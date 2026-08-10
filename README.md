# Portfolio Web - Rafael Menezes de Santana

Repositorio contendo o codigo fonte do portfolio profissional de Rafael Menezes de Santana. O projeto foi desenhado para destacar competencias solidas em desenvolvimento Backend, visao de Arquitetura de Sistemas e habilidades na construcao de interfaces modernas no Frontend.

## Tecnologias Utilizadas

Este projeto foi construido utilizando tecnologias modernas voltadas para performance e componentizacao:

* **React** (via Vite)
* **Tailwind CSS** para estilizacao e design system
* **Framer Motion** para controle avancado de animacoes e microinteracoes
* **Lucide React** para iconografia vetorial
* **Node.js** como ambiente de execucao e gerenciador de pacotes

## Arquitetura do Projeto

O frontend segue uma estrutura modular, limpa e baseada em componentes focados, aplicando nocoes de Clean Code para facilitar a futura escalabilidade.

* `public/` - Arquivos estaticos expostos diretamente (curriculo, favicon e imagem de perfil).
* `src/components/` - Modulos isolados que representam cada secao da landing page.
  * `Hero.jsx`: Secao inicial de apresentacao.
  * `TechTicker.jsx`: Carrossel infinito de tecnologias.
  * `Timeline.jsx`: Componente vertical exibindo o historico de atuacao profissional.
  * `ProjectShowcase.jsx`: Vitrine de projetos e sistemas governamentais/corporativos.
  * `Footer.jsx`: Informacoes de contato e links uteis.

## Executando o Projeto Localmente

Para rodar a aplicacao em ambiente de desenvolvimento, e necessario ter o Node.js instalado na maquina.

1. Clone o repositorio:
```bash
git clone https://github.com/rafelms/portifolio-web.git
```

2. Acesse a pasta do projeto:
```bash
cd "portifolio-web"
```

3. Instale as dependencias:
```bash
npm install
```

4. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

5. O Vite inicializara o projeto, geralmente disponivel no endereco `http://localhost:5173`.

## Gerando a Versao de Producao

Para compilar a aplicacao visando publicacao em um servidor web, execute:

```bash
npm run build
```

Este comando ira gerar uma pasta chamada `dist/`, contendo o bundle minificado, arquivos CSS processados e recursos estaticos otimizados.

## Padroes de Design

A interface foi projetada para evadir formatos "genericos", focando em um tom rigorosamente profissional.

* **Tema:** Dark Mode exclusivo.
* **Paleta de Cores:** Fundo Preto (Background) com destaques em Roxo e textos em Branco/Cinza claro.
* **Tipografia:** Fonte Poppins, garantindo legibilidade moderna.
* **Animacoes:** Utilizadas com moderacao, servindo apenas para criar uma experiencia mais imersiva e direcionar a atencao do usuario.

## Licenca e Uso

Projeto desenvolvido de forma autoral para uso como portfolio profissional. 
