import "../styles/globals.css";
import Layout from "../src/components/Layout";
import NavBar from "../src/components/Nav";

function MyApp({ Component, pageProps }) {
  return (
    <>
      {/* <NavBar /> */}
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}

export default MyApp;
