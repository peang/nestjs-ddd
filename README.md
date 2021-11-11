## Description

[NestJS](https://github.com/nestjs/nest) DDD framework TypeScript starter repository.

why `fastify` ?
https://stackoverflow.com/questions/47733390/nestjs-vs-plain-express-performance

We separate lifecycle process for application, console commands, and consumers. All related lifecycle must use separate modules accordingly. This gave us benefits :
- Modules only imports and load all required modules for each lifecycle
- When one modules break, it wont affect the others

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Running Console Commands

```bash
# make sure you already run build before running this
$ node ./dist/console [command]

# example
$ node ./dist/console cron-success
$ node ./dist/console cron-fail
```

## Running Consumers

```
# development
$ npm run startConsumer

# watch mode
$ npm run startConsumer:dev

# production mode
$ npm run startConsumer:prod
```


## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

