import Meta from "./Meta";
import Nav from "./Nav";
import Footer from "./Footer";
const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-green-200 ">
      <Meta />
      <Nav />
      <main className="flex flex-wrap mb-4 mt-4 mx-2 items-start content-evenly justify-center ">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
