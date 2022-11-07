export type Dish = {
    id?: number | null 
    name: string
    Category: string;
    NutritunalValue: number;
    Recipe: string;
    Ingredients: string;
    Picture: string;
}

export type Dishs = {
    data: Dish[];
}
