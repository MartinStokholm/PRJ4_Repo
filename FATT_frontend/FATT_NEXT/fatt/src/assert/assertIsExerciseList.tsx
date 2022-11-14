import type { Exercises } from "../../interfaces/Exercise";

export function assertIsExercise(
  exercises: any
): asserts exercises is Exercises {
  if (
    !(
      "name" in exercises ||
      "category" in exercises ||
      "durantion" in exercises ||
      "intensity" in exercises ||
      "repetitions" in exercises ||
      "sets" in exercises
    )
  ) {
    throw new Error("Not exercise");
  }
}
//https://github.com/typestack/class-transformer
