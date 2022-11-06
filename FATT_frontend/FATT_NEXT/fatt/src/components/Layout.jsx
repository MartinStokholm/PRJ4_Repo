import Meta from "./Meta";
import Footer from "./Footer";
import Nav from "./Nav";

const Layout = ({ children }) => {
  return (
    <> 
        <Meta/>
        <Nav />
        <main>
          {children}
        </main>
        {<Footer />}
      
    </>
  );
};

export default Layout;
