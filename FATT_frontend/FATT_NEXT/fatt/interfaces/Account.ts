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
  email: string;
  password: string;
};

export type AccountLoginDto = {
  email: string;
  password: string;
};

export type AccountChangeEmailDto = {
  email: string;
  newEmail: string;
  password: string;
};

export type AccountChangePasswordDto = {
  email: string;
  password: string;
  newPassword: string;
};

export type AccountDeleteDto = {
  email: string;
  password: string;
};

export type AccountGetDto = {
  email: string;
  name: string;
  weigth: number;
  gender: string;
  age: number;
};
