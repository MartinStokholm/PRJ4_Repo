import "../styles/globals.css";
import Layout from "../src/components/Layout";
import NavBar from "../src/components/Header";

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
