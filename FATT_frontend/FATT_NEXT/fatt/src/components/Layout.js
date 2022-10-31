import styles from "../../styles/Layout.module.css";

import HeadComponent from "./HeadComponent";
import Header from "./Header";
import Footer from "./Footer";

const Layout = ({ children }) => {
  return (
    <>
      <div className={styles.container}>
        <HeadComponent title={"FATT"} />
        <Header />

        <main className={styles.main}>
          <h1>FATT</h1>
          <p>dsadsafsadfsadsa</p>
          {children}
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Layout;
