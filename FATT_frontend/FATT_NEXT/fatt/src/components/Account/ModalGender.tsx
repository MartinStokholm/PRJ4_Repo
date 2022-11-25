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
    <div className="p-6 flex">
      <form
        onSubmit={handleOnClick}
        className="flex border rounded border-gray-200 items-center"
      >
        <h3 className="text-xl font-semibold text-gray-900 m-4">
          Update Gender
        </h3>
        <InputField
          className="m-4"
          placeholder="Gender"
          onChange={(e) => setGender(e.target.value)}
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
