# Desafio - Desenvolvedor Fullstack Sênior
Seja bem-vindo! Este desafio foi projetado para avaliar a sua capacidade técnica como candidato à vaga de Desenvolvedor Fullstack Sênior.

## Instruções
1. Faça um fork deste repositório;
2. Utilize alguma das tecnologias (front-end e back-end) informadas na proposta desse desafio;
3. Crie um passo a passo de como rodar a sua aplicação;
4. Após finalizar, submeta um pull request com um comentário informando o seu e-mail de contato e aguarde nossa avaliação;

## Proposta
Você deverá desenvolver uma central de ajuda. Esta plataforma deverá possuir uma API construída com Node.js utilizando o framework de sua preferência que servirá para fornecer a comunicação necessária a uma aplicação web ReactJS por onde os atendentes estarão dando suporte a usuários que abrirão chamados por um aplicativo móvel construído com React Native.

Esta plataforma deve atender as seguintes histórias:
- Eu como usuário do aplicativo desejo abrir um chamado;
- Eu como usuário do aplicativo desejo conversar através de um chat com um usuário do gerenciador;
- Eu como usuário do aplicativo desejo pontuar meu atendimento do chamado que foi encerrado (pesquisa de satisfação);
- Eu como usuário do gerenciador desejo realizar login;
- Eu como usuário do gerenciador desejo receber atualizações, em tempo real, de chamados solicitados por usuários do aplicativo;
- Eu como usuário do gerenciador desejo conversar através de um chat com usuários do aplicativo;
- Eu como usuário do gerenciador desejo finalizar um atendimento;

> **Observações:**
> - Sua aplicação web DEVE se comunicar com sua API;
> - Sua aplicação mobile DEVE se comunicar com sua API;
> - Você pode utilizar os bancos de dados relacional (ou não relacional) de sua preferência.
> - Você pode utilizar a estratégia que lhe for pertinente para garantir a comunicação em tempo real das aplicações web e mobile;

## Diferenciais
Serão considerados diferenciais o desenvolvimento de testes unitários e de integração em qualquer uma das aplicações desenvolvidas.

### Manual de Uso
- Faça o CLONE do repositório, para uma maquina local;
- Abra a pasta do projeto com o terminal de comando de sua preferencia;
- Execute os seguintes comandos na ordem abaixo:
- - 'cd helpdesk';
- - 'node install';
- - 'adonis serve --dev';

Após este processo, o sistema estará rodando no caminho http://localhost:3333.

### Uso do sistema
Para iniciar o uso do sistema, basta acessar com o navegador o endereço http://localhost:3333.

Você será direcionado inicialmente para a pagina de login.

Para acessar como administrador, deverá ser utilizada a seguinte combinação:
-User: admin
-PSW: admin

### Notas de Uso
- O banco de dados é uma instancia de Postgres em Cloud.
- Caso queiram ver a estrutura criada, seguem os acessos: 
DB_HOST=kesavan.db.elephantsql.com
DB_PORT=5432
DB_USER=xxsslbln
DB_PASSWORD=VQ-VmVSED9gQI8m5bJlPyxj-SeI5jUrn
DB_DATABASE=xxsslbln

