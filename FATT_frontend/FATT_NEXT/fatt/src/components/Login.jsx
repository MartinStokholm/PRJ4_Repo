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
    <section>
      <img src="/fatt-logo.png" alt="Fattylee" width="100%" height="100%" />
      <h2>Log-in</h2>
      <form onSubmit={handleForm}>
        <Label>Email :</Label>
        <TextInput
          type="Email"
          required
          placeholder="johndoe@mail.com"
          value={Email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Label>Password :</Label>
        <TextInput
          type="Password"
          required
          placeholder="********"
          value={Password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button className="mx-auto my-4" type="submit">
          Log In
        </Button>
      </form>
    </section>
  );
};

export default Login;
