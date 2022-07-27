import "../styles/globals.css";
import "../styles/Loader.scss";
import { Hydrate, QueryClient, QueryClientProvider } from "react-query";
import { useState } from "react";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import { ThemeProvider } from "next-themes";
import Header from '../components/Header';

function MyApp({ Component, pageProps }) {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.deHydratedState}>
        <ThemeProvider enableSystem={true} attribute="class">
          <Header />
          <NavBar />
          <Component {...pageProps} />
          <Footer />
        </ThemeProvider>
      </Hydrate>
    </QueryClientProvider>
  );
}

export default MyApp;
