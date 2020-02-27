# @cleartax/apollo-server-plugin-introspection-auth

> An apollo plugin to secure introspection queries with token based authentication.

---

![npm (scoped)](https://img.shields.io/npm/v/@cleartax/apollo-server-plugin-introspection-auth?style=flat-square)
![NPM](https://img.shields.io/npm/l/@cleartax/apollo-server-plugin-introspection-auth?style=flat-square)
![David](https://img.shields.io/david/cleartax/apollo-server-plugin-introspection-auth?style=flat-square)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

## Installation

Install the plugin as dependency.

```sh
npm install -S @cleartax/apollo-server-plugin-introspection-auth
```

`apollo-server` is a peer-dependency for this package.

If you haven't already, install it via:-

```sh
npx install-peerdeps @cleartax/apollo-server-plugin-introspection-auth
```

## Usage

When instantiating `ApolloServer`, pass the following options:-

```ts
const apolloServer = new ApolloServer({
  //...
  introspection: true,
  plugins: [
    ApolloServerIntrospectionAuth({
        type: 'header-token',
        name: 'x-app-introspect-auth', // custom header name
        value: ['<valid-auth-token>'], // valid header values
      }),
  ];
});
```

**Note**: Ideally, you would want to add this configuration for non-development environments only. In which case, you can add the options conditionally. The following example illustrates adding it for higher environments in `apollo-server-express`:-

```ts
// this example uses `apollo-server-express`
import { ApolloServerExpressConfig, ApolloServer } from 'apollo-server-express';
import ApolloServerIntrospectionAuth from '@cleartax/apollo-server-plugin-introspection-auth';

let options: ApolloServerExpressConfig = {
  // ...
  // your default apollo server express config
};

// add this configuration for NON-development environments
if (process.env.NODE_ENV === 'production') {
  options = {
    ...options,
    playground: false, // turn off playground in production
    introspection: true, // configure apollo to allow introspection
    plugins: plugins.concat([
      // add the plugin to check for authentication on introspection queries
      ApolloServerIntrospectionAuth({
          type: 'header-token',
          name: 'x-app-introspect-auth', // header name
          value: ['<valid-auth-token>'], // valid header values
        }),
    ]);
  }
}

const apolloServer = new ApolloServer(options);
```

## References

Inspired from [this](https://github.com/apollographql/apollo-server/issues/1933#issuecomment-580510024) implementation in [apollographql/apollo-server#1933](https://github.com/apollographql/apollo-server/issues/1933).

1. [Apollo GraphQL](https://www.apollographql.com/docs/)
2. [Apollo Graph Manager](https://www.apollographql.com/docs/graph-manager/)
