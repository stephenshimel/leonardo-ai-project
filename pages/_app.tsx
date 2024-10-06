import React from "react";
import client from "@/src/apollo/client";
import { ApolloProvider } from "@apollo/client";
import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import Head from "next/head";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ApolloProvider client={client}>
        <ChakraProvider>
          <Component {...pageProps} />
        </ChakraProvider>
      </ApolloProvider>
    </>
  );
}
