import type { DishJustNameDto } from "./Dish";

export type Meal = {
    id: number;
    Name: string;
    Category: string;
    Desciption: string;
    NutritunalValue: number;
};

export type Meals = {
    data: Meal[];
};

export type MealDishNamesDto = {
    id: number;
    Name: string;
    Category: string;
    Desciption: string;
    NutritunalValue: number;
    Dishes: DishJustNameDto;
}

export type MealJustNameDto = {
    id: number;
    name: string
};

export type MealSimpleDto = {
    Name: string;
    Catecory: string;
    Decription: string;
}