
import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { BaseGraphUri, token } from "./Constants";


const httpLink = createHttpLink({
    uri: BaseGraphUri,
  });
  
  const authLink = setContext((_, { headers }) => {
    const Token = token
    return {
      headers: {
        ...headers,
        "x-hasura-admin-secret": Token,
      },
    };
  });
  
  export const Api = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });