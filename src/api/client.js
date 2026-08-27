import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { tokenStorage } from "./tokenStorage";

// En desarrollo apunta al backend local (npm run dev en /foodplease-backend).
// En producción, define EXPO_PUBLIC_API_URL en un archivo .env (ver
// .env.example) con la URL del App Service de Azure — Expo SDK 51 expone
// automáticamente las variables EXPO_PUBLIC_* a través de process.env.
export const API_URL = process.env.EXPO_PUBLIC_API_URL || "http://localhost:4000/graphql";

const httpLink = createHttpLink({ uri: API_URL });

const authLink = setContext(async (_request, { headers }) => {
  const token = await tokenStorage.get();
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

export const apolloClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: { fetchPolicy: "cache-and-network" },
  },
});
