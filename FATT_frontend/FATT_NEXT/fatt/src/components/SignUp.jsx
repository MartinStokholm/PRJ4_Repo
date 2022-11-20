import { Button, Label, Select, TextInput } from "flowbite-react";
import React from "react";
import { useState } from "react";
import {
  postRegister,
  usePostRegister,
} from "../mutation/account/PostRegister";
import MyButton from "./SignUpButton";
import type { AccountNoIdDto } from "../../interfaces/Account";
import { useRouter } from "next/router";

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
      Name,
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

  const handleSignUpClick = (e) => {
    //e.preventDefault();
    const account: AccountNoIdDto = {
      name: Name,
      email: Email,
      password: Password,
    };
    postRegister(account);
    //useRouter().push("/login");
  };

  return (
    <div className="grid place-items-center">
      <img src="/fatt-logo.png" alt="Fattylee" width="25%" height="25%" />
      <section>
        <h2> Sign Up</h2>
        <h3 className="italic">It’s free, quick and easy</h3>
        <form onSubmit={handleForm} className="grid gap-4 grid-cols-2">
          <div>
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
          </div>

          <div>
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
          </div>
          {/* here we should change to use our custom button instead */}
          <Button className="mx-auto my-4 col-span-2" type="submit">
            Sign Up
          </Button>
        </form>
      </section>
    </div>
  );
};

export default SignUp;
