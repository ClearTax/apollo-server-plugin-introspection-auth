/* eslint-disable @typescript-eslint/no-explicit-any */
import { ApolloServerPlugin, GraphQLRequestContext } from 'apollo-server-plugin-base';
// eslint-disable-next-line import/no-extraneous-dependencies
import { ForbiddenError } from 'apollo-server';

import { isIntrospectionRequest } from './utils';

// allow for different types of authentication, currently support only token based
type Options = {
  /** Type of authentication */
  type: 'header-token';
  /** Name of the header in which the token should be looked for and validated. */
  name: string;
  /** Array of valid tokens */
  value: string[];
};

/**
 * Validate a given token against a single or multiple valid values.
 * @param value
 * @param shouldMatch
 */
const isValidToken = (value: string | null, shouldMatch: string | string[]) => {
  if (!value || !Array.isArray(shouldMatch)) return false;

  return shouldMatch.includes(value);
};

/**
 * A plugin to allow introspection queries to be run only via authenticated requests.
 * @name ApolloServerIntrospectionAuth
 * @param options {Options}
 */
export default function plugin(options: Options = Object.create(null)): ApolloServerPlugin {
  return {
    requestDidStart(context: GraphQLRequestContext<any>) {
      const { request } = context;
      if (isIntrospectionRequest(request) && options.type) {
        if (options.type === 'header-token' && request.http) {
          const { name, value } = options;
          const { headers } = request.http;

          if (!headers.has(name) || !isValidToken(headers.get(name), value)) {
            throw new ForbiddenError('You are not authorized to perform this request.');
          }
        }
      }
    },
  };
}
