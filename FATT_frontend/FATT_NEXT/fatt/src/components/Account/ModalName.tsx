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
    <div className="p-6 flex">
      <form
        onSubmit={handleOnClick}
        className="flex border rounded border-gray-200 items-center"
      >
        <h3 className="text-xl font-semibold text-gray-900 m-4">Update Name</h3>
        <InputField
          className="m-4"
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
        />
      </form>
      <InputButton
        onClick={handleOnClick}
        type={"onSubmit"}
        text={"Update"}
        key={undefined}
      />
    </div>
  );
}
