import InputField from "../InputField";
import { useState } from "react";
import { useUpdateAge } from "../../mutation/account/PutAge";
import InputButton from "../Button/InputButton";

export default function ModalAge() {
  const [age, setAge] = useState();
  const { mutate: updateAge } = useUpdateAge();

  const handleOnClick = (e) => {
    e.preventDefault();
    updateAge(age);
  };

  return (
    <form
      onSubmit={handleOnClick}
      className="flex border rounded border-gray-200 items-center"
    >
      <InputField
        required={true}
        type="number"
        value={age}
        placeholder="age"
        onChange={(e) => setAge(e.target.value)}
      />
      <InputButton
        onClick={handleOnClick}
        type={"onSubmit"}
        text={"Update Age"}
        key={undefined}
      />
    </form>
  );
}
