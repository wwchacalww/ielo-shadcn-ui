# Instituto Elo - Projeto feito em Shadcn/Ui

Projeto criado para o intuito de estudar o Shadcn/UI com react.

## Primeiros passos
 - [X] Projeto criado com Vite
 - [X] Tailwind e Postcss instalados
 - [X] Shadcn/UI instalados
 - [X] eslint configurado
 - [X] Prettier plugin tailwindcss instalado
 - [X] eslint-plugin-simple-import-sort instaldo

## Setup do Projeto
 - [X] Instalar e configurar [React-Router](https://reactrouter.com/start/library/installation)
 - [X] Configurar layouts
 - [X] Instalar e configurar [react-helmet-async](https://github.com/staylor/react-helmet-async)
 - [X] Instalar Axios
 - [X] Configurar variaveis de ambiente (.env.local)
 - [X] Instalar e configurar [react-query](https://react-query.tanstack.com/docs/overview)

## Páginas e Componentes(UI)
 - [X] Página: Login
 - [X] Usando React Hook Form
 - [X] Notificações toast (sonner)
 - [X] Página: Cadastro de Profissionais
 - [X] Layout do app com cabeçalho
   - [X] Trocar senha
   - [X] Logout
 - [X] Lista de Profissionais
   - [X] Detalhes de cada profissional na tabela
   - [X] Paginação
 - [X] Página: Cadastro de pacientes
 - [X] Lista de pacientes
   - [X] Detalhes de cada paciente na tabela
   - [X] Paginação
 - [X] Página: Agendamentos
 - [X] Cadastro de agendamentos
 - [X] Lista de agendamentos
   - [X] Detalhes de cada agendamento na tabela
   - [X] Paginação
   - [X] Filtrar por data
 - [X] Página: Dashaboard
   - [X] Cards com informações sobre agenda e pacientes
   - [X] Gráfico de agendamentos
 - [X] Página: 404 não encontrada
  
## A Fazer
 - [X] Botão de reagendar na lista de agendamentos
 - [ ] Criar um contexto de autentição compartilhando informações
   - [ ] Usuário
   - [ ] Profissional
   - [ ] Supervisor Técnico
 - [ ] Layout só dos profissionais 
   - [X] troca status do próprio atendimento
   - [ ] lançar evolução
     - [X] Página de lançamento da evolução
     - [ ] Api de criação de evolução
     - [ ] Api de consulta de evolução
     - [ ] Api de consulta de atendiemto
     - [ ] Api de evolução em pdf
   - [ ] lançar relatório

## Instruções
 - renomear o arquivo .env.example para .env.local
 - executar o comando: 
```bash
npm i
npm run dev
```