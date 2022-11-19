export type Account = {
  id: number;
  name: string;
  weigth: number;
  gender: string;
  age: number;
  email: string;
};

export type Accounts = {
  data: Account[];
};

export type AccountNoIdDto = {
  name: string;
  weigth: number;
  gender: string;
  age: number;
  email: string;
};
