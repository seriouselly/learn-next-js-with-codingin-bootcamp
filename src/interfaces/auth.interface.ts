import { LoginResponse } from "@/types/";
import { User } from "./user.interface";

// Login
export interface LoginRequest {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface LoginData {
  user: User;
  accessToken: string;
  expiresIn: string;
}

// Auth Me
export interface AuthMeData {
  id: string;
  email: string;
  role: string;
}

// Auth State
export interface AuthState {
  user: AuthMeData | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  setLoading: (loading: boolean) => void;
  checkAuth: () => Promise<void>;
  login: ({ value }: { value: LoginRequest }) => Promise<LoginResponse>;
  logout: () => void;
}
