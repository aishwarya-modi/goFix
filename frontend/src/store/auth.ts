"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: "user" | "admin";
  createdAt: string;
}

interface AuthState {
  users: User[];
  currentUser: User | null;
  hydrated: boolean;

  signup: (name: string, email: string, password: string) => { success: boolean; error?: string };
  login: (email: string, password: string) => { success: boolean; error?: string };
  logout: () => void;
  setHydrated: () => void;
  isAdmin: () => boolean;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      users: [
        {
          id: "admin-1",
          name: "Admin",
          email: "admin@gofix.dev",
          password: "admin123",
          role: "admin",
          createdAt: new Date().toISOString(),
        },
      ],
      currentUser: null,
      hydrated: false,

      signup: (name, email, password) => {
        const { users } = get();
        if (users.find((u) => u.email === email)) {
          return { success: false, error: "Email already registered" };
        }
        const newUser: User = {
          id: `user-${Date.now()}`,
          name,
          email,
          password,
          role: "user",
          createdAt: new Date().toISOString(),
        };
        set({ users: [...users, newUser], currentUser: newUser });
        return { success: true };
      },

      login: (email, password) => {
        const { users } = get();
        const user = users.find((u) => u.email === email && u.password === password);
        if (!user) {
          return { success: false, error: "Invalid email or password" };
        }
        set({ currentUser: user });
        return { success: true };
      },

      logout: () => set({ currentUser: null }),

      setHydrated: () => set({ hydrated: true }),

      isAdmin: () => get().currentUser?.role === "admin",
    }),
    {
      name: "gofix-auth",
      partialize: (state) => ({
        users: state.users,
        currentUser: state.currentUser,
      }),
    }
  )
);
