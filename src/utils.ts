import { GraphQLRequestContext } from 'apollo-server-plugin-base';

const REGEX_INTROSPECTION_QUERY = /\b(__schema|__type)\b/;

/**
 * Identify if the request is an introspection query type
 * @param request {GraphQLRequestContext['request]}
 */
export const isIntrospectionRequest = (request: GraphQLRequestContext<any>['request']) => {
  if (typeof request.query === 'string') {
    return REGEX_INTROSPECTION_QUERY.test(request.query);
  }
  return false;
};
