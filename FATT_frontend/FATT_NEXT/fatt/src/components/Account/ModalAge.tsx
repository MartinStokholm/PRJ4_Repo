import { TextInput } from "flowbite-react";
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
    <div className="p-6">
      <h3 className="text-xl font-semibold text-gray-900 mb-5">Update age</h3>
      <form
        onSubmit={handleOnClick}
        className="flex border rounded border-gray-200"
      >
        <TextInput
          className="m-4"
          type="text"
          placeholder="age"
          onChange={(e) => setAge(e.target.value)}
        />
      </form>
      <InputButton type={"onSubmit"} text={"Update"} key={undefined} />
    </div>
  );
}
