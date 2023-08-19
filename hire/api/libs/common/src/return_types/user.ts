export type RegisterUser = {
  id: string;
  name: string;
  email: string;
  avatar: string;
};

export type GetUserByEmail = {
  id: string;
  name: string;
  email: string;
  avatar: string;
  boosts: number;
  firstTimeLogin: boolean;
  role: "company_user" | "standard_user";
  createdAt: Date;
  updatedAt: Date;
  profile: {
    id: string;
    userId: string;
    interestedIn: string[];
  };
};

export type ValidateUser = {
  id: string;
  password: string;
};

export type PublicCredentials = {
  id: string;
  name: string;
  email: string;
  avatar: string;
};

export type GetUserById = {
  id: string;
  name: string;
  email: string;
  avatar: string;
  boosts: number;
  firstTimeLogin: boolean;
  role: "company_user" | "standard_user";
  createdAt: Date;
  updatedAt: Date;
  profile: {
    id: string;
    userId: string;
    interestedIn: string[];
  };
};
