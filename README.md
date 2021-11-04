## Description

[Sinbad](https://sinbad.co.id/) [Nest](https://github.com/nestjs/nest) DDD framework TypeScript starter repository.

why `fastify` ?
https://stackoverflow.com/questions/47733390/nestjs-vs-plain-express-performance

We separate lifecycle process for application, console commands, and consumers. All related lifecycle must use separate modules accordingly. This gave us benefits :
- Modules only imports and load all required modules for each lifecycle
- When one modules break, it wont affect the others

## Installation

```bash
$ npm install

# For linking binary to local node_modules
# so you can trigger console commands
$ npm link
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
# development
$ npx aloof [command]

# example
$ npx aloof health-check
$ npx aloof order-detail id
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

