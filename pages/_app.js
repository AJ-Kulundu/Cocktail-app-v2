import "../styles/globals.css";
import { Hydrate, QueryClient, QueryClientProvider } from "react-query";
import { useState } from 'react';

function MyApp({ Component, pageProps }) {
  const[queryClient] = useState(()=> new QueryClient)
  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.deHydratedState}>
        <Component {...pageProps} />
      </Hydrate>
    </QueryClientProvider>
  );
}

export default MyApp;
