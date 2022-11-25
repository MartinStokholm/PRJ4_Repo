import NumberField from "../NumberField";
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
    <div className="p-6 flex">
      <form
        onSubmit={handleOnClick}
        className="flex border rounded border-gray-200 items-center"
      >
        <h3 className="text-xl font-semibold text-gray-900 m-4">Update age</h3>
        <NumberField
          className="m-4"
          placeholder="age"
          onChange={(e) => setAge(e.target.value)}
          min={14}
          max={120}
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
