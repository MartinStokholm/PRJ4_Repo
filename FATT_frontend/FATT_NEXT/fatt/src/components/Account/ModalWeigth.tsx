import InputField from "../InputField";
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
    <form
      onSubmit={handleOnClick}
      className="flex border rounded border-gray-200 items-center"
    >
      <InputField
        required={true}
        type="number"
        value={weight}
        placeholder="Weight"
        onChange={(e) => setWeight(e.target.value)}
      />
      <InputButton
        onClick={handleOnClick}
        type={"onSubmit"}
        text={"Update Weight"}
        key={undefined}
      />
    </form>
  );
}
