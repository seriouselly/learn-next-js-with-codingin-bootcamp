import { create } from "zustand";
import Cookies from "js-cookie";
import type { AuthState, ErrorResponse, LoginRequest } from "@/interfaces";
import { AuthCookie, AuthMeResponse, LoginResponse } from "@/types";
import { getCurrentUser, loginUser } from "@/services";
import { parseExpiresIn } from "@/helpers";
import { toast } from "sonner";

const authCookieType: AuthCookie = "accessToken";

export const useAuthStore = create<AuthState>()((set) => ({
  user: null,
  isLoading: true,
  isAuthenticated: false,
  setLoading: (loading: boolean) => set({ isLoading: loading }),
  checkAuth: async () => {
    try {
      set({ isLoading: true });
      const res = await getCurrentUser();
      set({ user: res.data, isAuthenticated: true, isLoading: false });
    } catch (error) {
      console.error("Error checking authentication:", error);
      Cookies.remove(authCookieType);
      set({
        user: null,
        isAuthenticated: false,
        isLoading: false,
      });
      toast.error("Failed to check authentication");
    }
  },

  login: async ({ value }: { value: LoginRequest }): Promise<LoginResponse> => {
    try {
      const res: LoginResponse = await loginUser(value);
      const token: string = res.data.accessToken;
      const expires: string = res.data.expiresIn;

      if (token && expires) {
        const expiresInDays = parseExpiresIn(expires);

        Cookies.set(authCookieType, token, {
          expires: expiresInDays,
          path: "/",
        });
      }

      try {
        set({ isLoading: true });
        const res: AuthMeResponse = await getCurrentUser();
        set({
          user: res.data,
          isAuthenticated: true,
          isLoading: false,
        });
      } catch (error) {
        Cookies.remove(authCookieType);
        set({
          user: null,
          isAuthenticated: false,
          isLoading: true,
        });
        throw error;
      }
      return res;
    } catch (error: unknown) {
      Cookies.remove(authCookieType);
      set({
        user: null,
        isAuthenticated: false,
        isLoading: true,
      });
      const errorMessage =
        (error as ErrorResponse)?.message ||
        "Login failed due to an unexpected error";
      throw new Error(errorMessage);
    }
  },

  logout: () => {
    Cookies.remove(authCookieType);
    set({
      user: null,
      isAuthenticated: false,
      isLoading: false,
    });
  },
}));
