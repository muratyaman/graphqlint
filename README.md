# graphqlint
GraphQLint is for linting schema files against certain rules and conventions - aim to integrate with ESLint and VSCode

This package is using Node and TypeScript


## install

```sh
npm i
```

## build

```sh
npm run build
```

## lint

```sh
npm run lint
```

## tests

```sh
npm run test
# or
# npm run test:coverage
```

## samples

You can use `./bin/index.js`

```sh
npm run sample:01a
npm run sample:01b

# multiple files
npm run sample:all
```

## usage

```sh
npm i -g graphqlint
graphqlint path/to/your/schema.gql
```
