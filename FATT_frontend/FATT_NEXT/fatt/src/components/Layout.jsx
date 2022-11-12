import Meta from "./Meta";
import Nav from "./Nav";
import Footer from "./Footer";
const Layout = ({ children }) => {
  return (
    <div className="min-h-screen">
      <Meta />
      <Nav />
      <main className="flex flex-wrap mb-4 mt-4 mx-2 items-start content-evenly ">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
