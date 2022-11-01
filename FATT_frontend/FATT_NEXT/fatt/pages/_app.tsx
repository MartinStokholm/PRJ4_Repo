import "../styles/globals.css";
import Layout from "../src/components/Layout";
import NavBar from "../src/components/Nav";
import { QueryClientProvider, QueryClient } from 'react-query'
import { ReactQueryDevtools  } from "react-query/devtools";
const queryClient = new QueryClient()
const dev = process.env.NODE_ENV !== 'production'

function MyApp({ Component, pageProps }) {
  return (
    <QueryClientProvider client={queryClient}>
      {/* <NavBar /> */}
      <Layout>
        <Component {...pageProps} />
      </Layout>
      
      <ReactQueryDevtools initialIsOpen={false} position='bottom-right' />
      
      </QueryClientProvider>
  );
}

export default MyApp;
