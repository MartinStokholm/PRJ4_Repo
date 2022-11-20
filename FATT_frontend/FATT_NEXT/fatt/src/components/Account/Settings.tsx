import InputButton from "../Button/InputButton";
import DeleteButton from "../Button/DeleteButton";
import { TextInput } from "flowbite-react";

const Settings = () => {
  return (
    <div>
      <h1 className="font-bold mb-4">Account settings</h1>

      <h2>Change email</h2>
      <form className="flex">
        <TextInput className="m-4" type="email" placeholder="Email" />
        <TextInput className="m-4" type="email" placeholder="New email" />
        <TextInput className="m-4" type="password" placeholder="Password" />
        <InputButton type={"submit"} text={"Create"} key={undefined} />
      </form>
      <h2>Change password</h2>
      <form className="flex">
        <TextInput className="m-4" type="email" placeholder="Email" />
        <TextInput className="m-4" type="password" placeholder="Password" />
        <TextInput className="m-4" type="password" placeholder="New Password" />
        <InputButton type={"submit"} text={"Create"} key={undefined} />
      </form>
      <h2>Delete account</h2>
      <form className="flex">
        <TextInput className="m-4" type="number" placeholder="AccountId" />
        <TextInput className="m-4" type="text" placeholder="Email" />
        <TextInput className="m-4" type="password" placeholder="New Password" />
        <DeleteButton text={"Delete"} key={undefined} />
      </form>
    </div>
  );
};

export default Settings;
