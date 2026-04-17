import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type UserState = {
  email: string;
  isAuthenticated: boolean;
  hydrated: boolean;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  setHydrated: () => void;
};

// Static Credentials
const VALID_CREDENTIALS = {
  email: "admin@example.com",
  password: "admin",
};

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      email: "",
      isAuthenticated: false,
      hydrated: false,

      login: (email: string, password: string) => {
        if (
          email === VALID_CREDENTIALS.email &&
          password === VALID_CREDENTIALS.password
        ) {
          set({ email, isAuthenticated: true });
          return true;
        }
        return false;
      },

      logout: () => set({ email: "", isAuthenticated: false }),

      setHydrated: () => set({ hydrated: true }),
    }),
    {
      name: "user-store",
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
        state?.setHydrated();
      },
    },
  ),
);
