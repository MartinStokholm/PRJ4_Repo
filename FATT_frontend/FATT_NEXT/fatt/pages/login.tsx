import Link from "next/link";
import { useState } from "react";
import Login from "../src/components/Account/Login";

export default function login() {
  return (
    <>
      <Login />
      {/* <Link
        href="/signUp"
        className="mx-4 text-center hover:underline hover:font-semibold hover:text-green-500 md:hover:text-green-500"
      >
        Click here to sign up
      </Link> */}
    </>
  );
}
