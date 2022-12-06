import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
// import { SessionProvider } from "next-auth/react";
import Layout from "../src/components/Layout/Layout";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { SetupInterceptors } from "../src/utils/axios";
import "../styles/globals.css";
import Login from "../src/components/Account/Login";

const queryClient = new QueryClient();
const dev = process.env.NODE_ENV !== "production";

function MyApp({ Component, pageProps }) {
  SetupInterceptors();
  return (
    <QueryClientProvider client={queryClient}>
      <ToastContainer />
      <Layout>
        <Component {...pageProps} />
      </Layout>

      <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
    </QueryClientProvider>
  );
}

export default MyApp;
