import { http } from "@/shared/api/http";
import type { UserLoginDto, UserRegisterDto, AuthResponseDto } from "@/shared/types/models";

export const loginUser = async (data: UserLoginDto): Promise<AuthResponseDto> => {
  const response = await http.post<AuthResponseDto>("/api/User/login", data);
  return response.data;
};

export const registerUser = async (data: UserRegisterDto): Promise<string> => {
  // Returns userId
  const response = await http.post<string>("/api/User/register", data);
  return response.data;
};
