import { Button, Label, TextInput } from "flowbite-react";
import MyButton from "./Button/SignUpButton";
import React from "react";
import { useState } from "react";
import Image from "next/image";
import { AccountLoginDto } from "../../interfaces/Account";
import { useLogin } from "../mutation/account/PostLogin";
import { useRouter } from "next/router";

const Login = (props) => {
  const { mutate: login } = useLogin();
  const [Password, setPassword] = useState("");
  const [Email, setEmail] = useState("");

  const handleForm = (e) => {
    e.preventDefault();
    const account: AccountLoginDto = { email: Email, password: Password };
    login(account);
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
          <MyButton type={"submit"} text={"Log In"} key={undefined} />
          {/* <Button
            className="mx-auto my-4 col-span-2 bg-transparent hover:bg-green-500 text-green-500 font-semibold hover:text-white py-2 px-4 border border-green-500 hover:border-transparent rounded m-4 "
            type="submit"
          >
            Log In
          </Button> */}
        </form>
      </section>
    </div>
  );
};

export default Login;
