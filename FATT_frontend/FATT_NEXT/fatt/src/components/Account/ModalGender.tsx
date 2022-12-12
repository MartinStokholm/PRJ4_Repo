import InputField from "../InputField";
import { useState } from "react";
import { useUpdateGender } from "../../mutation/account/PutGender";
import InputButton from "../Button/InputButton";

export default function ModalGender() {
  const [gender, setGender] = useState();
  const { mutate: updateGender } = useUpdateGender();

  const handleOnClick = (e) => {
    e.preventDefault();
    updateGender(gender);
  };

  return (
    <form
      onSubmit={handleOnClick}
      className="flex border rounded border-gray-200 items-center"
    >
      <InputField
        type={"text"}
        value={gender}
        required={true}
        placeholder="Gender"
        onChange={(e) => setGender(e.target.value)}
      />
      <InputButton
        onClick={handleOnClick}
        type={"onSubmit"}
        text={"Update Gender"}
        key={undefined}
      />
    </form>
  );
}
