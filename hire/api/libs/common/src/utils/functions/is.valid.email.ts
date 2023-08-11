import { emailRegex } from "@app/common/constants/regex";

export const isValidEmail = (email: string): boolean => {
  return emailRegex.test(email);
};
