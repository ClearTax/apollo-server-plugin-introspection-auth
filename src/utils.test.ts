import type { GraphQLRequest } from 'apollo-server-plugin-base';
import { isIntrospectionRequest } from './utils';

describe('identifies introspection queries', () => {
  it('request.query must be string', () => {
    expect(isIntrospectionRequest({} as GraphQLRequest)).toBe(false);
  });
  test.each<[string, string, boolean]>([
    ['empty string', '', false],
    [
      'simple introspection query with __type',
      `query {
        __type(name: "Root") {
          kind
        }
      }`,
      true,
    ],
    [
      'introspection query with __schema',
      `query {
        __schema {
          queryType {
            fields {
              description
              deprecationReason
            }
          }
        }
      }`,
      true,
    ],
    [
      'simple query',
      `query {
          allPeople(last: 10) {
            people {
              name
              gender
              eyeColor
            }
          }
        }`,
      false,
    ],
    [
      'query requesting __typename',
      `query {
        allStarships {
          starships {
            name
            __typename
          }
        }
      }`,
      false,
    ],
  ])('with: %s', (name: string, input: string, expected: boolean) => {
    expect(
      isIntrospectionRequest({
        query: input,
      } as GraphQLRequest)
    ).toBe(expected);
  });
});
