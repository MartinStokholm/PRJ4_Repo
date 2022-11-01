import Image from "next/image";
import { WithReactQuery } from "./api/withReactQuery";

export default function Workout() {
  return (
    <div>
      <WithReactQuery />
    </div>
  );
}
