import React, { useEffect, useState } from "react";
import { Navbar } from "flowbite-react";

const Nav = () => {
  const [session, setSession] = useState(false);
  const [name, setName] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (localStorage.getItem("name") && session == false) {
        setName(localStorage.getItem("name") as string);
      } else setName("User");

      if (localStorage.getItem("token") && session == false) {
        setSession(true);
      }
    }
  }, []);

  return (
    <Navbar
      fluid={true}
      rounded={false}
      className="sticky top-0 shadow-md bg-white"
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
          href="/meal"
        >
          Meals
        </Navbar.Link>

        <Navbar.Link
          className="hover:text-green-500 md:hover:text-green-500"
          href="/exercise"
        >
          Exercises
        </Navbar.Link>

        <Navbar.Link
          className="hover:text-green-500 md:hover:text-green-500"
          href="/dish"
        >
          Dishes
        </Navbar.Link>
        {session ? (
          <Navbar.Link
            className="hover:text-green-500 md:hover:text-green-500"
            href="/signout"
          >
            Logout {name}
          </Navbar.Link>
        ) : (
          <Navbar.Link
            className="hover:text-green-500 md:hover:text-green-500"
            href="/login"
          >
            Login
          </Navbar.Link>
        )}
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Nav;
