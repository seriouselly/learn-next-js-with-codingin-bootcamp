import { AuthMeData, LoginData } from "@/interfaces/auth.interface";
import { BaseResponse } from "@/interfaces/base.interface";

export type LoginResponse = BaseResponse<LoginData>;
export type AuthMeResponse = BaseResponse<AuthMeData>;
