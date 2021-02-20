# API base with Node.js
[![PT-BR Version][ptbr-image]][ptbr-url]

Basic architecture for creating complex APIs with NodeJS. Including:
- Connection to the database using Typeorm.
- Pre-configured migrations for creating users and tokens for password recovery.
- Routes for creating, authenticating and recovering users' passwords.
- Support for automated tests using Jest.
- Upload local files and support to upload files on Amazon S3.
- Configuration for sending test emails using Ethereal.
- Configuration for sending e-mails using Amazon SES.
- Configuration for cache control using Redis.
- Data validation with Celebrate.


## Getting Started

### Prerequisites

* Docker
* Npm or Yarn

### Installing

**Instantiate the required containers with Docker**

*By default the project is configured with POSTGRES, but can be changed by any other database supported by [TypeORM](https://typeorm.io/#/).*

Replace DATABASENAME with the name of the desired database and PASSWORD with the desired password.

```
$ docker run --name DATABASENAME -e POSTGRES_PASSWORD=PASSWORD -p 5432:5432 -d postgres
$ docker run --name redis -p 6379:6379 -d -t redis:alpine

```

**Configure the database connection**

Create a file named "ormconfig.json" at the root of the project, identical to the file *ormconfig.example.json*, with your database settings

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

**Set the environment variables**

Create a file named ".env" at the root of the project identical to the *.env.example file*, replacing the environment variables with the desired ones

```
# Application
APP_SECRET=YOUR-SCECRET-KEY # Generate a secret key for your project at https://www.md5hashgenerator.com/
APP_API_URL=http://localhost:3333 # Enter the project URL
APP_WEB_URL=http://localhost:4200 # Enter the Front End URL for this project

# Redis
REDIS_HOST=localhost # Host to connect to Redis
REDIS_PORT=6379 # Port used in the docker to connect to Redis
REDIS_PASS= # Password used to connect to Redis

STORAGE_DRIVER=disk # Disk (local) or s3 support
MAIL_DRIVER=ethereal # Support for ethereal (tests) or SES
```

**Run the migrations to create the basic tables**

```
$ yarn typeorm migration:run
```

**Install all project dependencies**

```
$ yarn
```

## Running the tests

Run the tests to validate that everything is working fine

```
$ yarn typeorm
```

## Running in development mode

```
$ yarn dev:server
```

You can see the project running in http://localhost:3333/

## Built With

* [Node](https://nodejs.org/en/)
* [Typescript](https://www.typescriptlang.org/)
* [Typeorm](https://typeorm.io/#/)
* [Express](https://expressjs.com/)
* [Redis](https://redis.io/)
* [Jest](https://jestjs.io/)
* [Celebrate](https://github.com/arb/celebrate#readme)

and more...

## Contributing

To contribute to the project follow the steps below:

1. Make the _fork_ of the project (<https://github.com/joaovjs/base-backend-with-node/fork>)
2. Create a _branch_ for your modification (`git checkout -b feature/fooBar`)
3. Make _commit_ (`git commit -am 'Add some fooBar'`)
4. _Push_ (`git push origin feature/fooBar`)
5. Create a new _Pull Request_

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE) file for details

## Acknowledgments

This project was developed based on the classes proposed by the team at [Rockeseat Education](https://github.com/rocketseat-education)

<!-- Markdown link & img dfn's -->
[ptbr-image]: https://i.imgur.com/D04C8eI.jpeg
[ptbr-url]: README.pt-BR.md
