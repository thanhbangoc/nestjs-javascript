# NestJS Skeleton

# Getting Started

This project is the the skeleton that provides basic functionalities to build a working microservice.

## Running service locally

Before you start make sure that you have installed:

* NodeJS that includes `npm`
* [PostgreSQL](https://www.postgresql.org/) `v10.7`
* Optionally [Docker](https://www.docker.com/) with [Docker Compose](https://docs.docker.com/compose/)

### Locally

```sh
$ npm i
$ npm run start:dev
```

### Inside Docker container

```sh
$ docker-compose up --build -V
```

For Docker user, in order to execute commands in the project, you should run the interactive `bash` shell in the container

```sh
$ docker ps # Get the ID of service container
$ docker exec -it <service-container-id> /bin/bash
```

# References

* https://docs.nestjs.com/techniques/database#sequelize-integration
* https://docs.nestjs.com/techniques/validation
* https://docs.nestjs.com/openapi/introduction
* https://typeorm.io/#/entities
* https://typeorm.io/#/relations
* https://typeorm.io/#/migrations
* https://www.npmjs.com/package/class-validator
