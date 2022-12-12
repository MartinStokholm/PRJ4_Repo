import InputField from "../InputField";
import { useState } from "react";
import { useUpdateName } from "../../mutation/account/PutName";
import InputButton from "../Button/InputButton";

export default function ModalName() {
  const [name, setName] = useState();
  const { mutate: updateName } = useUpdateName();

  const handleOnClick = (e) => {
    e.preventDefault();
    updateName(name);
  };

  return (
    <form
      onSubmit={handleOnClick}
      className="flex border rounded border-gray-200 items-center"
    >
      <InputField
        type={"text"}
        value={name}
        required={true}
        placeholder="Name"
        onChange={(e) => setName(e.target.value)}
      />
      <InputButton
        onClick={handleOnClick}
        type={"onSubmit"}
        text={"Update Name"}
        key={undefined}
      />
    </form>
  );
}
