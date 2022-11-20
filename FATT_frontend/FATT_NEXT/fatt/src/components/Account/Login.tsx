import { Label, TextInput } from "flowbite-react";
import MyButton from "../Button/InputButton";
import React from "react";
import { useState } from "react";
import { AccountLoginDto } from "../../../interfaces/Account";
import { useLogin } from "../../mutation/account/PostLogin";

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
        </form>
      </section>
    </div>
  );
};

export default Login;
