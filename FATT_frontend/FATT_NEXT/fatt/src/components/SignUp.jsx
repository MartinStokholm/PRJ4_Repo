import { Button, Label, Select, TextInput } from "flowbite-react";
import React from "react";
import { useState } from "react";

const SignUp = (props) => {
  const [UserName, setUserName] = useState("");
  const [Password, setPassword] = useState("");
  const [Name, setName] = useState("");
  const [Email, setEmail] = useState("");
  const [Gender, setGender] = useState("");
  const [age, setage] = useState("");
  const [Weigth, setWeigth] = useState("");

  const handleForm = (e) => {
    e.preventDefault();
    const post = {
      UserName,
      Password,
      Name,
      Email,
      Gender,
      age,
      Weigth,
    };
    fetch("http://localhost:4000/Register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(post),
    }).then(() => {
      // console.log("post added");
      // props.history.push("/");
      window.location = "/login";
    });
  };
  return (
    <section>
      <h2> Sign Up</h2>
      <h3>It’s quick and easy</h3>
      <form onSubmit={handleForm}>
        <Label>Name :</Label>
        <TextInput
          type="Name"
          placeholder="John Doe"
          onChange={(e) => setName(e.target.value)}
        />

        <Label>Age :</Label>
        <TextInput
          type="age"
          placeholder="69"
          required
          value={age}
          onChange={(e) => setage(e.target.value)}
        />
        <Label>Weigth :</Label>
        <TextInput
          type="Weigth (kg)"
          placeholder="420"
          required
          value={Weigth}
          onChange={(e) => setWeigth(e.target.value)}
        />

        <Label>Gender :</Label>
        <Select value={Gender} onChange={(e) => setGender(e.target.value)}>
          <option value=""> </option>
          <option value="Helicopter">Helicopter</option>
          <option value="Male">Male</option>
          <option value="Famale">Female</option>
        </Select>
        <Label>Username :</Label>
        <TextInput
          type="UserName"
          placeholder="mxxxx"
          required
          value={UserName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <Label>Email :</Label>
        <TextInput
          type="Email"
          placeholder="johndoe@mail.com"
          required
          value={Email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Label>Password :</Label>
        <TextInput
          type="Password"
          placeholder="********"
          required
          value={Password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button className="mx-auto my-4" type="submit">
          Sign Up
        </Button>
      </form>
    </section>
  );
};

export default SignUp;
