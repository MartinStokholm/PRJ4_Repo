import type {MealJustNameDto} from "./Meal"

export type Dish = {
    id: number
    name: string
    Category: string;
    NutritunalValue: number;
    Recipe: string;
    Ingredients: string;
    PicturePath : string;
}

export type Dishs = {
    data: Dish[];
}

export type DishNoIdDto = {
    Name: string
    Category: string;
    NutritunalValue: number;
    Recipe: string;
    Ingredients: string;
    PicturePath : string;
}

export type DishJustNameDto = {
    id?: number
    Name: string
}

export type DishMealNamesDto = {
    id: number
    name: string
    Category: string;
    NutritunalValue: number;
    Recipe: string;
    Ingredients: string;
    PicturePath : string;
    Meals: MealJustNameDto [];
}

// Idk about this last one. Why does it contains a list of meals
// It will break the relationship of our domain model
export type DishWThumbnailDto = {
    id: number
    name: string
    Category: string;
    NutritunalValue: number;
    Recipe: string;
    Ingredients: string;
    PicturePath : string;
    Meals: MealJustNameDto [];
}