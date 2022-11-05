<p align="center">
  <img src="./nlw-copa-mobile\src\assets\logo.svg" />
  <hr />
</p>
<p align="center">
  Projeto desenvolvido durante a NLW (Next Level Week) da Rocketseat
</p>
<br>

# Sobre o projeto

Uma plataforma que permite que usuários criem e participem de bolões para a copa do mundo 2022. A aplicação web tem o objetivo de apenas criar bolões, enquanto o app mobile possui todas as outras funcionalidades do sistema

<img src="./nlw-copa-web\public\assets\web.png" alt="drawing" width="800"/>

# Tecnologias utilizadas

- Typescript
- React
- React Native
- Native Base
- NextJs
- Tailwind CSS
- Expo
- Fastify
- Prisma
- SQLite

[![Minhas Habilidades](https://skillicons.dev/icons?i=ts,react,nextjs,tailwind,prisma,sqlite)](https://skillicons.dev)

# Inicialização

## API

entre na pasta `nlw-copa-api` presente no diretório raiz, e execute o comando para instalar as dependências:

```bash
npm i
```

ou

```bash
yarn
```

Agora para criar o banco de dados, rode o comando:

```bash
npx prisma migrate dev
```

Por fim para iniciar o servidor, rode o comando:

```bash
npm run dev
```

ou

```bash
yarn dev
```

> Atenção: não esqueça de criar um arquivo chamado ".env" e colocar as informações conforme o arquivo .env.example

## Web

Para rodar o projeto web, entre na pasta `nlw-copa-web` presente no diretório raiz, e rode o comando para instalar as dependências:

```bash
npm i
```

ou

```bash
yarn
```

Agora para iniciar o projeto, rode o comando:

```bash
npm run dev
```

ou

```bash
yarn dev
```

> Atenção: não esqueça de iniciar o servidor antes de iniciar o projeto web

## Mobile

Para rodar o projeto mobile você precisará baixar o app [Expo Go](https://expo.dev/client).
Após baixar o app, entre na pasta `mobile` presente no diretório raiz, e rode o comando para instalar as dependências:

```bash
npm i
```

ou

```bash
yarn
```

Agora para iniciar o projeto, rode o comando:

```bash
npm run start
```

ou

```bash
yarn dev
```

> Atenção: não esqueça de iniciar o servidor antes de iniciar o projeto mobile
> Atenção: não esqueça de criar um arquivo chamado ".env" e colocar as informações conforme o arquivo .env.example

## Autor

Made with 💜 by <a href="https://github.com/Willian-Rodrigues" target="_blank">Willian Rodrigues</a>
