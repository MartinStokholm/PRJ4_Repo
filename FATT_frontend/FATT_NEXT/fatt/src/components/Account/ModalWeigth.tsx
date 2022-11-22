import { TextInput } from "flowbite-react";
import { useState } from "react";
import { useUpdateWeight } from "../../mutation/account/PutWeight";
import InputButton from "../Button/InputButton";

export default function ModalWeight() {
  const [weight, setWeight] = useState();
  const { mutate: updateWeight } = useUpdateWeight();

  const handleOnClick = (e) => {
    e.preventDefault();
    updateWeight(weight);
  };

  return (
    <div className="p-6">
      <h3 className="text-xl font-semibold text-gray-900 mb-5">
        Update Weight
      </h3>
      <form
        onSubmit={handleOnClick}
        className="flex border rounded border-gray-200"
      >
        <TextInput
          className="m-4"
          type="text"
          placeholder="Weight"
          onChange={(e) => setWeight(e.target.value)}
        />
      </form>
      <InputButton type={"onSubmit"} text={"Update"} key={undefined} />
    </div>
  );
}
