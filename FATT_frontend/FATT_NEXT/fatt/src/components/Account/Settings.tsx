import InputButton from "../Button/InputButton";
import DeleteButton from "../Button/DeleteButton";
import { TextInput } from "flowbite-react";
import { useUpdateEmail } from "../../mutation/account/PutEmail";
import { useUpdatePassword } from "../../mutation/account/PutPassword";
import { useDeleteAccount } from "../../mutation/account/DeleteAccount";
import {
  AccountChangeEmailDto,
  AccountDeleteDto,
  AccountChangePasswordDto,
} from "../../../interfaces/Account";
import { useState } from "react";

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
    <div>
      <h1 className="font-bold mb-4">Account settings</h1>

      <h2>Change email</h2>
      <form
        onSubmit={handleUpdateEmailButtonClick}
        className="flex border rounded border-gray-200"
      >
        <TextInput
          className="m-4"
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextInput
          className="m-4"
          type="newEmail"
          placeholder="New email"
          data-testid="newEmail"
          value={newEmail}
          onChange={(e) => setNewEmail(e.target.value)}
        />
        <TextInput
          className="m-4"
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <InputButton type={"submit"} text={"Update"} key={undefined} />
      </form>

      <h2>Change password</h2>
      <form
        onSubmit={handleUpdatePasswordButtonClick}
        className="flex border rounded border-grey-200"
      >
        <TextInput
          className="m-4"
          type="email"
          data-testid="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextInput
          className="m-4"
          type="password"
          data-testid="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <TextInput
          className="m-4"
          type="newPassword"
          placeholder="New Password"
          data-testid="newPassword"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <InputButton type={"submit"} text={"Update"} key={undefined} />
      </form>

      <h2>Delete account</h2>
      <form
        onSubmit={handleDeleteButtonClick}
        className="flex border rounded border-grey-200"
      >
        <TextInput
          className="m-4"
          type="text"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextInput
          className="m-4"
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <DeleteButton text={"Delete"} key={undefined} />
      </form>
    </div>
  );
};

export default Settings;
