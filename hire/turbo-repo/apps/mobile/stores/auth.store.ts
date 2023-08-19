import { create } from "zustand";
import Storage from "expo-storage";
import axios from "axios";

import { User, LoggedIn, GeneratedTokens } from "@swift/types";
import { API_URL } from "@env";

export type Profile = {
  id: string;
  name: string;
  email: string;
  avatar: string;
};

export type Credentials = {
  email: string;
  password: string;
  type: "mobile";
};

export type Register = {
  name: string;
  email: string;
  password: string;
};

export type AuthStore = {
  profile: Profile | null;
  setProfile: (profile: Profile) => void;
  user: User | null;
  setUser: (user: User) => void;
  getTokens: () => Promise<GeneratedTokens>;
  setTokens: (tokens: GeneratedTokens) => void;
  clearTokens: () => Promise<void>;
  getMe: (email: string) => Promise<Profile | null>;
  register: (credentials: Register) => Promise<void>;
  login: (credentials: Credentials) => Promise<User>;
  logout: () => void;
};

export const useAuth = create<AuthStore>((set, get) => ({
  profile: null,
  setProfile: (profile) => set({ profile }),
  user: null,
  setUser: (user) => set({ user }),
  getTokens: async () => {
    const accessToken = await Storage.getItem({ key: "access_token" });
    const refreshToken = await Storage.getItem({ key: "refresh_token" });

    if (!accessToken || !refreshToken) {
      throw new Error("No tokens found");
    }

    return { accessToken, refreshToken } as const;
  },
  setTokens: async ({ accessToken, refreshToken }) => {
    await Promise.all([
      await Storage.setItem({ key: "access_token", value: accessToken }),
      await Storage.setItem({ key: "refresh_token", value: refreshToken }),
    ]);
  },
  clearTokens: async () => {
    await Promise.all([
      Storage.removeItem({ key: "access_token" }),
      Storage.removeItem({ key: "refresh_token" }),
    ]);
  },
  getMe: async (email) => {
    const response = await axios.post(`${API_URL}/users/me`, {
      email: email.toLowerCase(),
    });

    if (typeof response.data === "string") return null;

    const { setProfile } = get();

    setProfile(response.data);

    return response.data;
  },
  register: async (credentials) => {
    const response = await axios.post<Profile>(
      `${API_URL}/auth/register`,
      credentials,
    );

    if (response.status !== 201) throw new Error("Failed to register user");

    const { setProfile } = get();
    setProfile(response.data);
  },
  login: async (credentials) => {
    const response = await axios.post<LoggedIn>(
      `${API_URL}/auth/login`,
      credentials,
    );

    if (response.status !== 200) {
      throw new Error("Login failed");
    }
    const { setUser, setTokens } = get();
    const { accessToken, refreshToken, user } = response.data;

    setUser(user);
    setTokens({ accessToken, refreshToken });

    return user;
  },
  logout: () => {
    const { clearTokens } = get();
    clearTokens();
    set({ user: null, profile: null });
  },
}));
