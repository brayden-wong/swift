export type GeneratedTokens = {
  readonly accessToken: string;
  readonly refreshToken: string;
};

export type LoggedIn = {
  readonly accessToken: string;
  readonly refreshToken: string;
  user: {
    id: string;
    name: string;
    email: string;
    avatar: string;
    role: "standard_user" | "company_user";
    boosts: number;
    isActive: boolean;
    firstTimeLogin: boolean;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
  };
};
