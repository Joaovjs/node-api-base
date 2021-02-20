# Base para API's com Node.js

Arquitetura básica para criação de API's complexas com NodeJS. Incluindo:
- Conexão ao banco de dados utilizando Typeorm.
- Migrations pré configuradas para criação de usuários e tokens para recuperação de senha.
- Rotas de criação, autenticação e recuperação de senha de usuários.
- Suporte a testes automatizados utilizando Jest.
- Upload de arquivos locais e suporte a upload de arquivos na Amazon S3.
- Configuração para envio de e-mails testes utilizando Ethereal.
- Configuração para envio de e-mails utilizando Amazon SES.
- Configuração para controle de cache utilizando Redis.
- Validação de parametros com Celebrate.


## Inicializando

### Pré-requisitos

* Docker
* Npm ou Yarn

### Instalação

**Instancie os containers necessários com Docker**

*Por padrão o projeto vem configurado com POSTGRES, mas pode ser alterado por qualquer outro banco de dados suportado pelo [TypeORM](https://typeorm.io/#/)*

substitua DATABASENAME pelo nome do banco desejado e PASSWORD pela senha desejada

```
$ docker run --name DATABASENAME -e POSTGRES_PASSWORD=PASSWORD -p 5432:5432 -d postgres
$ docker run --name redis -p 6379:6379 -d -t redis:alpine

```

**Configure a conexão com o banco de dados**

Crique um arquivo entitulado "ormconfig.json" na raiz do projeto, identico ao arquivo *ormconfig.example.json*, com as configurações do seu banco de dados

```
{
	"type": "postgres",
	"host": "localhost",
	"port": 5432,
	"username": "postgres",
	"password": "PASSWORD",
	"database": "DATABASE",
	"entities": [
		"./src/modules/**/infra/typeorm/entities/*.ts"
	],
	"migrations": [
		"./src/shared/infra/typeorm/migrations/*.ts"
	],
	"cli": {
		"migrationsDir": "./src/shared/infra/typeorm/migrations"
	}
}
```

**Configure as variáveis de ambiente**

Crie um arquivo entitulado ".env" na raiz do projeto identico ao arquivo *.env.example*, substituindo as váriaveis de ambiente pelas desejadas

```
# Application
APP_SECRET= # Gere uma chave secreta para seu projeto em https://www.md5hashgenerator.com/
APP_API_URL=http://localhost:3333 # Insira a URL do projeto
APP_WEB_URL=http://localhost:4200 # Insira, se ouver, a URL do Front end deste projeto

# Redis
REDIS_HOST=localhost # Host para conexão ao Redis
REDIS_PORT=6379 # Porta utilizada no docker para conexão ao Redis
REDIS_PASS= # Senha utilizada, se houver, para conexão ao Redis

STORAGE_DRIVER=disk # Suporte a disk (local) ou s3
MAIL_DRIVER=ethereal # Suporte a ethereal (testes) ou SES
```

**Execute as migrations para criação das tabelas inciais**

```
$ yarn typeorm migration:run
```

**Instale todas as dependências do projeto**

```
$ yarn
```

## Running the tests

Execute os testes para validar se está tudo funcionando como deveria

```
$ yarn typeorm
```

## Executando em modo de desenvolvimento

```
$ yarn dev:server
```

Seu projeto ficará online em http://localhost:3333/

## Construido com

* [Node](https://nodejs.org/en/)
* [Typescript](https://www.typescriptlang.org/)
* [Typeorm](https://typeorm.io/#/)
* [Express](https://expressjs.com/)
* [Redis](https://redis.io/)
* [Jest](https://jestjs.io/)
* [Celebrate](https://github.com/arb/celebrate#readme)

E mais...

## Contribuição

Para contribuiur com o projeto siga as etapas abaixo:

1. Faça o _fork_ do projeto (<https://github.com/joaovjs/base-backend-with-node/fork>)
2. Crie uma _branch_ para sua modificação (`git checkout -b feature/fooBar`)
3. Faça o _commit_ (`git commit -am 'Add some fooBar'`)
4. _Push_ (`git push origin feature/fooBar`)
5. Crie um novo _Pull Request_

## Licença

Este projeto está licenciado sob a Licença MIT - veja o arquivo [LICENSE.md](LICENSE) para ver os detalhes

## Agradecimentos

Este projeto foi desenvolvido com base nas aulas propostas pela equipe da [Rockeseat Education](https://github.com/rocketseat-education)

<!-- Markdown link & img dfn's -->
[ptbr-image]: https://i.imgur.com/D04C8eI.jpeg
[ptbr-url]: README.pt-BR.md
