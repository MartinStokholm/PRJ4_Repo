import { Label } from "flowbite-react";
import InputField from "../InputField";
import React from "react";
import { useState } from "react";
import { useRegister } from "../../mutation/account/PostRegister";
import InputButton from "../Button/InputButton";
import type { AccountNoIdDto } from "../../../interfaces/Account";
import { useRouter } from "next/router";

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
    <div className="flex flex-col justify-center w-1/3">
      <img src="/fatt-logo.png" alt="Fattylee" width="50%" height="50%" />
      <h2> Sign Up</h2>
      <h3 className="italic">It’s free, quick and easy</h3>
      <form
        onSubmit={handleSignUpClick}
        className="flex flex-col justify-center"
      >
        <Label className="mx-4">Name :</Label>
        <InputField
          type="text"
          placeholder="John Doe"
          data-testid="text"
          required
          value={Name}
          onChange={(e) => setName(e.target.value)}
        />
        <Label className="mx-4">Email :</Label>
        <InputField
          type="Email"
          data-testid="Email" 
          placeholder="johndoe@mail.com"
          required
          value={Email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Label className="mx-4">Password :</Label>
        <InputField
          type="Password"
          data-testid="Password" 
          placeholder="********"
          required
          value={Password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <InputButton
          text={"Sign Up"}
          // onClick={handleSignUpClick}
          type={"submit"}
          key={undefined}
        />
      </form>
    </div>
  );
};

export default SignUp;

/* <Label>Username :</Label>
            <TextInput
              type="UserName"
              placeholder="mxxxx"
              required
              value={UserName}
              onChange={(e) => setUserName(e.target.value)}
            /> */

// className="mx-auto my-4 col-span-2"

/*<div>
            
            <Label>Name :</Label>
            <TextInput
              type="Name"
              placeholder="John Doe"
              onChange={(e) => setName(e.target.value)}
            /> */

/* <Label>Age :</Label>
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
          </div>*/
