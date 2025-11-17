import { any, LoginRequest } from '../Models/index';
import axios from 'axios';
import { ApiResponseErrorHelper } from '../ApiResponseErrorHelper';
import { API_BASE_URL, DEFAULT_TIMEOUT, CURRENTLANGUAGE, getAuthToken } from '../baseUrl';
import { ApiResponse, PagedResponse } from '../Models/ApiResponse';
import { IAuthService } from '../Interfaces/index';

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
      const response = await api.post<ApiResponse<string>>(`/admin-login`, payload);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<string>(error);
    }
  }

  async getProfile(): Promise<ApiResponse<any>> {
    try {
      const response = await api.get<ApiResponse<any>>(`/user`);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<any>(error);
    }
  }

}
