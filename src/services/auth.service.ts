import { AxiosResponse } from "axios";
import Cookies from "js-cookie";
import { ErrorResponse, LoginRequest } from "@/interfaces";
import { LoginResponse, AuthMeResponse, AuthCookie } from "@/types";
import { authApi } from "@/configs";
import { parseExpiresIn } from "@/helpers";

const authCookieType: AuthCookie = "accessToken";

export const loginUser = async (
  loginData: LoginRequest,
): Promise<LoginResponse> => {
  try {
    const res: AxiosResponse<LoginResponse> = await authApi.post(
      "/auth/login",
      loginData,
    );

    // Save token to cookie
    if (res.data.data.accessToken && res.data.data.expiresIn) {
      const expiresInDays: number = parseExpiresIn(res.data.data.expiresIn);
      const cookieOptions = { expires: expiresInDays };

      Cookies.set(authCookieType, res.data.data.accessToken, cookieOptions);
    }

    return res.data;
  } catch (error: unknown) {
    // Properly type the error handling
    if (error && typeof error === "object" && "response" in error) {
      const axiosError = error as { response?: { data?: ErrorResponse } };
      const errorResponse: ErrorResponse = axiosError.response?.data || {
        message: "Unknown error",
        error: "Unknown error",
        statusCode: 500,
      };
      const errorMessage: string = errorResponse.message || "Login failed";
      throw new Error(errorMessage);
    }
    throw new Error("Network error occurred");
  }
};

export const getCurrentUser = async (): Promise<AuthMeResponse> => {
  const res: AxiosResponse<AuthMeResponse> = await authApi.get("/auth/me");
  return res.data;
};

export const loginMutationKey = "login";
export const currentUserQueryKey = "currentUser";
