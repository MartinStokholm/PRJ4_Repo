import { Link } from "react-router-dom";
const Header = () => {
  return (
    <header className="container">
      <nav className="navbar ">
        <h1>Fitness Application for Training and Tracking (FATT)</h1>
        <div className="links">
          <Link to="/"> Home </Link>
          <Link to="/create" className="btn">
            New Post
          </Link>
          
          <Link to="/Register" className="btn">
          Register
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
