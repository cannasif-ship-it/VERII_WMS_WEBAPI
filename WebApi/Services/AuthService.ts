import type { LoginRequest, RegisterDto, UserDto } from '../Models/index';
import axios from 'axios';
import { ApiResponseErrorHelper } from '../ApiResponseErrorHelper';
import { API_BASE_URL, DEFAULT_TIMEOUT, CURRENTLANGUAGE, getAuthToken } from '../baseUrl';
import type { ApiResponse, PagedResponse } from '../ApiResponse';
import type { IAuthService } from '../Interfaces/index';

const api = axios.create({
  baseURL: API_BASE_URL + "/Auth",
  timeout: DEFAULT_TIMEOUT,
  headers: { 'Content-Type': 'application/json', Accept: 'application/json', 'X-Language': CURRENTLANGUAGE },
});

api.interceptors.request.use((config : any) => { const token = getAuthToken(); if (token) { config.headers.Authorization = `Bearer ${token}`; } return config; });

export class AuthService implements IAuthService {
  async login(request: LoginRequest): Promise<ApiResponse<string>> {
    try {
      const response = await api.post<ApiResponse<string>>(`/login`, request);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<string>(error);
    }
  }

  async login(): Promise<ApiResponse<string>> {
    try {
      const response = await api.post<ApiResponse<string>>(`/admin-login`);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<string>(error);
    }
  }

  async getAllUsers(): Promise<ApiResponse<UserDto[]>> {
    try {
      const response = await api.get<ApiResponse<UserDto[]>>(`/users`);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<UserDto[]>(error);
    }
  }

  async getUserById(id: number): Promise<ApiResponse<UserDto>> {
    try {
      const response = await api.get<ApiResponse<UserDto>>(`/user/${id}`);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<UserDto>(error);
    }
  }

  async registerUser(registerDto: RegisterDto): Promise<ApiResponse<UserDto>> {
    try {
      const response = await api.post<ApiResponse<UserDto>>(`/register`, registerDto);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<UserDto>(error);
    }
  }

}
