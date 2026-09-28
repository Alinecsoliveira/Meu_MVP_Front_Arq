# Pokédex Front-end

Interface web desenvolvida em HTML, CSS e JavaScript puro para consumir a Pokédex API.
Permite cadastrar, listar, buscar, atualizar e excluir Pokémons de forma dinâmica.

## 🚀 Funcionalidades

    Formulário para cadastrar Pokémon
    Tabela dinâmica com listagem e botão de exclusão
    Busca por Pokémon via ID
    Exclusão por ID
    Atualização automática da tabela sem recarregar a página
    Consumo da API externa (PokéAPI)

## 📦 Instalação e Execução com Docker

1. Certifique-se de ter o Docker instalado em sua máquina.
 - [Instalação do Docker](https://docs.docker.com/get-docker/)
   
2. Construa a imagem Docker:

bash
docker build -t pokedex-frontend .

3. Execute o container:

bash
docker run -p 8080:80 pokedex-frontend

4. Acesse a aplicação no navegador:

http://127.0.0.1:8080

## 📂 Estrutura
index.html → Interface principal

styles.css → Estilos da aplicação

scripts.js → Lógica de interação com a API

## 🔗 Comunicação

O Frontend consome a Pokédex API (Back-End em Flask/SQLite).

