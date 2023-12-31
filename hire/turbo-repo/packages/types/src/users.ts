export type RegisterUser = {
  id: string;
  createdAt: Date;
};

export type GetUserByEmail = {
  email: string;
  name: string;
  avatar: string;
  role: "standard_user" | "company_user";
  boosts: number;
  createdAt: Date;
  updatedAt: Date;
  id: string;
  firstTimeLogin: boolean;
};

export type ValidateUser = {
  id: string;
  password: string;
};

export type PublicCredentials = {
  id: string;
  name: string;
  email: string;
  avatar: string | null;
};

export type User = {
  email: string;
  name: string;
  avatar: string;
  role: "standard_user" | "company_user";
  boosts: number;
  createdAt: Date;
  updatedAt: Date;
  id: string;
  firstTimeLogin: boolean;
}
