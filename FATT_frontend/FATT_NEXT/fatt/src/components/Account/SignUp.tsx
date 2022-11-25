import { Label } from "flowbite-react";
import InputField from "../InputField";
import React from "react";
import { useState } from "react";
import { useRegister } from "../../mutation/account/PostRegister";
import InputButton from "../Button/InputButton";
import type { AccountNoIdDto } from "../../../interfaces/Account";
import { useRouter } from "next/router";
import Heading from "../Layout/Heading";

export const SignUp = (props) => {
  const { mutate: register } = useRegister();
  const [Password, setPassword] = useState("");
  const [Email, setEmail] = useState("");
  const [Name, setName] = useState("");

  const handleSignUpClick = (e) => {
    e.preventDefault();
    const account: AccountNoIdDto = {
      name: Name,
      email: Email,
      password: Password,
    };
    register(account);
  };

  return (
    <div className="border rounded border-grey-300 bg-white overflow-hidden shadow-lg flex p-4 justify-center">
      <div className="flex flex-col justify-center w-1/3">
        <img src="/fatt-logo.png" alt="Fattylee" width="50%" height="50%" />
        <Heading text="Sign Up" />
        <h3 className="italic">It’s free, quick and easy</h3>
        <form
          onSubmit={handleSignUpClick}
          className="flex flex-col justify-center"
        >
          <Label className="mx-4">Name :</Label>
          <InputField
            type="text"
            placeholder="John Doe"
            required
            value={undefined}
            onChange={(e) => setName(e.target.value)}
          />
          <Label className="mx-4">Email :</Label>
          <InputField
            type="Email"
            placeholder="johndoe@mail.com"
            required
            value={Email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Label className="mx-4">Password :</Label>
          <InputField
            type="Password"
            placeholder="********"
            required
            value={Password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <InputButton
            text={"Sign Up"}
            onClick={handleSignUpClick}
            type={"submit"}
            key={undefined}
          />
        </form>
      </div>
    </div>
  );
};

export default SignUp;
