import React from "react";
import { Navbar } from "flowbite-react";
import Image from "next/image";

const Nav = () => {
  return (
    <Navbar
      fluid={true}
      rounded={false}
      className="sticky top-0 mx-auto shadow-md"
    >
      <Navbar.Brand href="/">
        <Image
          src="/fatt-logo.png"
          alt="Fattylee"
          width={100}
          height={100}
          className="mr-3 h6"
        />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white"></span>
      </Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse>
        <Navbar.Link href="/">Home</Navbar.Link>
        <Navbar.Link href="/workout">Workouts</Navbar.Link>
        <Navbar.Link href="/exercise">Exercises</Navbar.Link>
        <Navbar.Link href="/meal">Meals</Navbar.Link>
        <Navbar.Link href="/dish">Recipes</Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Nav;
