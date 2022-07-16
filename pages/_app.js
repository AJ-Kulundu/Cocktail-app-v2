import "../styles/globals.css";
import { Hydrate, QueryClient, QueryClientProvider } from "react-query";
import { useState } from 'react';
import { ReactQueryDevtools } from 'react-query/devtools'
import Footer from '../components/Footer';
import NavBar from '../components/NavBar';

function MyApp({ Component, pageProps }) {
  const[queryClient] = useState(()=> new QueryClient)
  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.deHydratedState}>
        <NavBar/>
        <Component {...pageProps} />
        <ReactQueryDevtools initialIsOpen={false} />
        <Footer/>
      </Hydrate>
    </QueryClientProvider>
  );
}

export default MyApp;
