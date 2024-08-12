import { create } from "zustand";

type clientType = {
  role: "admin" | "user" | null;
  verifyRole: (char: "admin" | "user") => void;
};

export const useClientRole = create<clientType>((set) => ({
  role: "admin",
  verifyRole: (char) => {
    set({ role: char });
  },
}));
