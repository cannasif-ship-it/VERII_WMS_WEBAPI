import { LoginDto, RegisterDto, User } from '../Models/index';
import { ApiResponse, PagedResponse } from '../Models/ApiResponse';

export interface IAuthService {
  getUserByUsername(username: string): Promise<ApiResponse<User>>;
  getUserById(id: number): Promise<ApiResponse<User>>;
  registerUser(registerDto: RegisterDto): Promise<ApiResponse<User>>;
  login(loginDto: LoginDto): Promise<ApiResponse<string>>;
}
