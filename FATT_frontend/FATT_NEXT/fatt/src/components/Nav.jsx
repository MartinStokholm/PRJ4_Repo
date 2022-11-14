import React from "react";
import { Navbar } from "flowbite-react";

const Nav = () => {
  return (
    <Navbar
      fluid={true}
      rounded={false}
      className="sticky top-0 mx-auto shadow-md"
    >
      <Navbar.Brand href="/">
        <img
          src="/fatt-logo.png"
          alt="Fattylee"
          width="100px"
          height="100px"
          className="mr-3 h6"
        />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white"></span>
      </Navbar.Brand>

      <Navbar.Toggle className="hover:text-green-500 md:hover:text-green-500" />

      <Navbar.Collapse>
        <Navbar.Link
          className="hover:text-green-500 md:hover:text-green-500"
          href="/"
        >
          Home
        </Navbar.Link>
        <Navbar.Link
          className="hover:text-green-500 md:hover:text-green-500"
          href="/workout"
        >
          Workouts
        </Navbar.Link>
        <Navbar.Link
          className="hover:text-green-500 md:hover:text-green-500"
          href="/exercise"
        >
          Exercises
        </Navbar.Link>
        <Navbar.Link
          className="hover:text-green-500 md:hover:text-green-500"
          href="/meal"
        >
          Meals
        </Navbar.Link>
        <Navbar.Link
          className="hover:text-green-500 md:hover:text-green-500"
          href="/dish"
        >
          Dishes
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Nav;
