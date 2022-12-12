import InputButton from "../Button/InputButton";
import DeleteButton from "../Button/DeleteButton";
import InputField from "../InputField";
import { useUpdateEmail } from "../../mutation/account/PutEmail";
import { useUpdatePassword } from "../../mutation/account/PutPassword";
import { useDeleteAccount } from "../../mutation/account/DeleteAccount";
import {
  AccountChangeEmailDto,
  AccountDeleteDto,
  AccountChangePasswordDto,
} from "../../../interfaces/Account";
import { useState } from "react";
import Heading from "../Layout/Heading";
import SubHeading from "../Layout/SubHeading";

const Settings = () => {
  const [email, setEmail] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const { mutate: updateEmail } = useUpdateEmail();
  const { mutate: updatePassword } = useUpdatePassword();
  const { mutate: deleteAccount } = useDeleteAccount();

  const handleUpdateEmailButtonClick = () => {
    const accountData: AccountChangeEmailDto = {
      email: email,
      newEmail: newEmail,
      password: password,
    };
    console.log(accountData);
    updateEmail(accountData);
  };

  const handleUpdatePasswordButtonClick = () => {
    const accountData: AccountChangePasswordDto = {
      email: email,
      password: password,
      newPassword: newPassword,
    };

    updatePassword(accountData);
  };

  const handleDeleteButtonClick = () => {
    const accountData: AccountDeleteDto = {
      email: email,
      password: password,
    };
    deleteAccount(accountData);
  };

  return (
    <>
      <Heading text="Account settings" />
      <div className="border rounded border-grey-300 bg-white overflow-hidden shadow-lg flex flex-col p-4">
        <SubHeading text="Change email" />
        <form
          onSubmit={handleUpdateEmailButtonClick}
          className="flex flex-wrap justify-center border rounded overflow-hidden shadow-lg border-gray-200 bg-white"
        >
          <InputField
            required={true}
            value={email}
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <InputField
            required={true}
            value={newEmail}
            type="email"
            placeholder="New email"
            onChange={(e) => setNewEmail(e.target.value)}
          />
          <InputField
            required={true}
            value={password}
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <InputButton type={"submit"} text={"Update"} key={undefined} />
        </form>

        <SubHeading text="Change password" />
        <form
          onSubmit={handleUpdatePasswordButtonClick}
          className="flex flex-wrap justify-center border rounded overflow-hidden shadow-lg border-gray-200 bg-white"
        >
          <InputField
            required={true}
            value={email}
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <InputField
            required={true}
            value={password}
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <InputField
            required={true}
            value={newPassword}
            type="password"
            placeholder="New Password"
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <InputButton type={"submit"} text={"Update"} key={undefined} />
        </form>

        <SubHeading text="Delete Account" />
        <form
          onSubmit={handleDeleteButtonClick}
          className="flex flex-wrap justify-center border rounded overflow-hidden shadow-lg border-gray-200 bg-white"
        >
          <InputField
            required={true}
            value={email}
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <InputField
            required={true}
            value={password}
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <DeleteButton text={"Delete"} key={undefined} />
        </form>
      </div>
    </>
  );
};

export default Settings;
