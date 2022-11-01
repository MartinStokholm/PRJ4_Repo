import styles from "../../styles/Layout.module.css";

import Meta from "./Meta";
import Footer from "./Footer";
import Nav from "./Nav";

const Layout = ({ children }) => {
  return (
    <>
      
        <Meta />
        <Nav />
        <div className={styles.container}>
        <main className={styles.main}>
          {children}
        </main>
        </div>
        {/* <Footer /> */}
      
    </>
  );
};

export default Layout;
