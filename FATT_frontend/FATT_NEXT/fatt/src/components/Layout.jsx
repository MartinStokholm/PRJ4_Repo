import Meta from "./Meta";
import Nav from "./Nav";
import Footer from "./Footer";
const Layout = ({ children }) => {
  return (
    <div className="min-h-screen">
      <Meta />
      <Nav />
      <main className="flex flex-wrap mb-4 mx-2 place-items-center items-start content-evenly justify-center">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
