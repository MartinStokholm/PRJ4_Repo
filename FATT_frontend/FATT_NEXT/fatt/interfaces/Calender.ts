export type CalenderCreateNoIdDto = {
  calandarId: number;
  workoutId: number;
  day: string;
};

export type Calender = {
  id: number;
  workoutDays: [id: number, workoutId: number, day: string];
  mealDays: [id: number, mealId: number, day: string];
};
