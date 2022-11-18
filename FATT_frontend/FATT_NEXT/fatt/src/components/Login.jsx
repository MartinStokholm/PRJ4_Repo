import { Button, Label, TextInput } from "flowbite-react";
import React from "react";
import { useState } from "react";
import Image from "next/image";

const Login = (props) => {
  const [Password, setPassword] = useState("");
  const [Email, setEmail] = useState("");
  const handleForm = (e) => {
    e.preventDefault();
    const post = {
      Password,
      Email,
    };
    fetch("http://localhost:4000/Register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(post),
    }).then(() => {
      props.history.push("/");
    });
  };
  return (
    <div className="grid place-items-center">
      <img src="/fatt-logo.png" alt="Fattylee" width="25%" height="25%" />
      <section className="w-1/3">
        <h2>Log-in</h2>
        <form onSubmit={handleForm}>
          <Label>Email: </Label>
          <TextInput
            type="Email"
            required
            placeholder="johndoe@mail.com"
            value={Email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Label>Password: </Label>
          <TextInput
            type="Password"
            required
            placeholder="********"
            value={Password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            className="mx-auto my-4 col-span-2 bg-transparent hover:bg-green-500 text-green-500 font-semibold hover:text-white py-2 px-4 border border-green-500 hover:border-transparent rounded m-4 "
            type="submit"
          >
            Log In
          </Button>
        </form>
      </section>
    </div>
  );
};

export default Login;
