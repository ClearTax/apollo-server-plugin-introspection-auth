import { GraphQLRequestContext } from 'apollo-server-plugin-base';

const REGEX_INTROSPECTION_QUERY = /\b(__schema|__type)\b/;

/**
 * Identify if the request is an introspection query type
 * @param request {GraphQLRequestContext['request]}
 */
export const isIntrospectionRequest = <TContext>(request: GraphQLRequestContext<TContext>['request']) =>
  typeof request.query === 'string' && REGEX_INTROSPECTION_QUERY.test(request.query);
