import type { DishJustNameDto } from "./Dish";

export type Meal = {
  Id: number;
  Name: string;
  Category: string;
  Desciption: string;
  NutritunalValue: number;
};

export type Meals = {
  Data: Meal[];
};

export type MealDishNamesDto = {
  Id: number;
  Name: string;
  Category: string;
  Desciption: string;
  NutritunalValue: number;
  Dishes: DishJustNameDto;
};

export type MealJustNameDto = {
  Id: number;
  Name: string;
};

export type MealNoIdDto = {
  Name: string;
  Category: string;
  Desciption: string;
};
