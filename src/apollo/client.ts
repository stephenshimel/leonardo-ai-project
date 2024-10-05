import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://rickandmortyapi.com/graphql', // Replace this with the API you're using
  cache: new InMemoryCache(),
});

export default client;