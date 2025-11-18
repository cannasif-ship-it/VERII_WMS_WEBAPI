import type { LoginRequest, RegisterDto, UserDto } from '../Models/index';
import type { ApiResponse, PagedResponse } from '../ApiResponse';

export interface IAuthService {
  getUserById(id: number): Promise<ApiResponse<UserDto>>;
  getAllUsers(): Promise<ApiResponse<UserDto[]>>;
  registerUser(registerDto: RegisterDto): Promise<ApiResponse<UserDto>>;
  login(loginDto: LoginRequest): Promise<ApiResponse<string>>;
}
