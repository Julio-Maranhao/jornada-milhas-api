<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

## Description 👨‍💻

Project made using NestJs, TypeORM, Postgres, Docker and ChatGPT.
Part of Allura Back-End Chaleng 7 - Jornada Milhas API

## Requirements 💻

Have [Docker Desktop](https://www.docker.com/products/docker-desktop/) installed
have [Visual Studio Code](https://code.visualstudio.com/) installed
## Installation 👨‍💻

```bash
$ git clone https://github.com/Julio-Maranhao/jornada-milhas-api
$ cd jornada-milhas-api
$ npm install
```

## Before Running 🦶💨

##### Create a .env file on project root with this configuration:

```js
DB_USERNAME=username
DB_PASSWORD=password
DB_ADMIN_EMAIL=udername@admin.com
DB_PORT=5432
DB_HOST= 127.0.0.1
DB_NAME=jornada_milhas
GPT_API_KEY=your-chatGPT-api-key
```
##### Run command
```bash
$ docker compose up -d
```
##### open postgres admin on [localhost:8081](http://localhost:8081)

login: DB_ADMINEMAIL
password: DB_PASSWORD

##### Create Database on Postgres
right-click on servers ➡ Create Server:
name: jornada_milhas
Host: postgres
port: equals DB_PORT
username: equals DB_USERNAME

right-click on databases ➡ Create Database:
database: jornada_milhas
owner: equals DB_USERNAME

After Creation you can close pgAdmin

##### Create all tables
```bash
$ npm run typeorm:run-migrations
```

## Running the app 🚘

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test 📈

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Challenges 🎯

Build an RestAPI with NestJs from Scratch implementing:

- TDD;
- SOLID;
- TypeORM Query Builders;
- Unit tests using Jest;
- E2E tests using Jest;
- ChatGpt Integration;
- Validators;
- Error handling;
- Migrations;
- Documentation with Swagger;
- Nest BultIn Pipes;
