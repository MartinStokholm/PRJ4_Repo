import styles from "../../styles/Layout.module.css";

import HeadComponent from "./HeadComponent";
import Footer from "./Footer";
import NavBar from "./Header";

const Layout = ({ children }) => {
  return (
    <>
      <div className={styles.container}>
        {/* <HeadComponent title={"FATT"} /> */}
        <NavBar />

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
