import { create } from "zustand";

type AuthState = {
  token: string | null;
  idUser: string | null;
  username: string | null;
  setToken: (token: string | null) => void;
  setIdUser: (token: string | null) => void;
  setUsername: (token: string | null) => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  token: localStorage.getItem("token"),
  idUser: localStorage.getItem("idUser"),
  username: localStorage.getItem("username"),
  setToken: (token) => {
    localStorage.setItem("token", token || "");
    set({ token });
  },
  setIdUser: (idUser) => {
    localStorage.setItem("idUser", idUser || "");
    set({ idUser });
  },
  setUsername: (username) => {
    localStorage.setItem("username", username || "");
    set({ username });
  },
}));
