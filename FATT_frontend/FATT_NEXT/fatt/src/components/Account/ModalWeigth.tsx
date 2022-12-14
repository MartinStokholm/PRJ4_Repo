import NumberField from "../NumberField";
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
    <div className="p-6 flex items-center">
      <form
        onSubmit={handleOnClick}
        className="flex border rounded border-gray-200 items-center"
      >
        <h3 className="text-xl font-semibold text-gray-900 m-4">
          Update Weight
        </h3>
        <NumberField
          required={true}
          value={weight}
          placeholder="Weight"
          onChange={(e) => setWeight(e.target.value)}
          min={40}
          max={250}
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
