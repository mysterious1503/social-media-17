import { HttpLink } from 'apollo-angular/http';
import { InMemoryCache, ApolloClient } from '@apollo/client/core';

export function createApolloClient(httpLink: HttpLink): ApolloClient<any> {
  return new ApolloClient({
    link: httpLink.create({
      uri: 'http://localhost:3000/graphql',
    }),
    cache: new InMemoryCache(),
    defaultOptions: {
      watchQuery: {
        fetchPolicy: 'cache-and-network',
      },
    },
  });
}
