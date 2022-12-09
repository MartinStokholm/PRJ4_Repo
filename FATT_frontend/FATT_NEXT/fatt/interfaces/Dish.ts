export type Dish = {
  id: number;
  name: string;
  ingredients: string;
  nutritionalValue: string;
  recipe: string;
  picturePath: string;
};

export type Dishs = {
  data: Dish[];
};

export type DishNoIdDto = {
  name: string;
  prepTime: string;
  ingredients: string;
  nutritionalValue: string;
  recipe: string;
  picturePath: string;
};

export type DishJustNameDto = {
  id?: number;
  name: string;
};
