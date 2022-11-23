import type { ExerciseFullDto } from "./Exercise";

export type Workout = {
  id: number;
  name: string;
  duration: string;
  intensity: string;
};

export type Workouts = {
  data: Workout[];
};

export type WorkoutCreateNoIdDto = {
  name: string;
  duration: string;
};

export type WorkoutCreateWithExerciseIdDto = {
  name: string;
  duration: string;
  exerciseIds: number[];
};

export type WorkoutSimpleDto = {
  id: number;
  name: string;
};

export type WorkoutRemoveDto = {
  id: number;
  exerciseid: number;
};

export type WorkoutWithExerciseFullDto = {
  id: number;
  name: string;
  duration: string;
  exercises: ExerciseFullDto[];
};

export type WorkoutWithExerciseIdDto = {
  id: number;
  name: string;
  duration: string;
  exercisesIds: number[];
};

export type WorkoutAddToCalendar = {
  workoutId: number;
  day: string;
  email: string;
};
