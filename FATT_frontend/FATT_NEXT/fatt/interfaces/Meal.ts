export type Meal = {
    id: number | null
    Category: string;
    Desciption: string;
    NutritunalValue: number;
};

export type Meals = {
    data: Meal[];
};