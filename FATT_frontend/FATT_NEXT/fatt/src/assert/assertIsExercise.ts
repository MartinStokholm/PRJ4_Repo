import type { Exercise } from "../../interfaces/Exercise"


export function assertIsExercise(exercise: any): asserts exercise is Exercise 
{

    if (!( "name" in exercise 
            || "category" in exercise 
            || "durantion" in exercise 
            || "intensity" in exercise 
            || "repetitions" in exercise 
            || "sets" in exercise
        )) {
        throw new Error("Not exercise");
    }
}
//https://github.com/typestack/class-transformer

