import { Label, TextInput } from "flowbite-react";
import MyButton from "../Button/InputButton";
import React from "react";
import { useState } from "react";
import { AccountLoginDto } from "../../../interfaces/Account";
import { useLogin } from "../../mutation/account/PostLogin";
import InputField from "../InputField";
import TextButton from "../Button/TextButton";
import Modal from "../Setting/Modal";

import SignUp from "./SignUp";
import Link from "next/link";

const Login = (props) => {
  const [showModal, setShowModal] = useState(false);
  const { mutate: login } = useLogin();
  const [Password, setPassword] = useState("");
  const [Email, setEmail] = useState("");

  const handleForm = (e) => {
    e.preventDefault();
    const account: AccountLoginDto = { email: Email, password: Password };
    login(account);
  };

  return (
    <div className="flex flex-col justify-center w-1/3">
      <img src="/fatt-logo.png" alt="Fattylee" width="50%" height="50%" />
      <h2>Log-in</h2>
      <form onSubmit={handleForm} className="flex flex-col justify-center">
        <Label className="mx-4">Email: </Label>
        <InputField
          type="Email"
          required
          placeholder="johndoe@mail.com"
          value={Email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Label className="mx-4">Password: </Label>
        <InputField
          type="Password"
          required
          placeholder="********"
          value={Password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <MyButton type={"submit"} text={"Log In"} key={undefined} />
      </form>

      <TextButton
        onClick={() => setShowModal(true)}
        text={"Click here to sign up"}
      />
      <Modal IsVisible={showModal} onClose={() => setShowModal(false)}>
        <SignUp />
      </Modal>

      <Link
        href="/signUp"
        className="mx-4 text-center hover:underline hover:font-semibold hover:text-green-500 md:hover:text-green-500"
      >
        Click here to sign up
      </Link>
    </div>
  );
};

export default Login;
