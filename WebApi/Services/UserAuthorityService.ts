import type { CreateUserAuthorityDto, UpdateUserAuthorityDto, UserAuthorityDto } from '../Models/index';
import axios from 'axios';
import { ApiResponseErrorHelper } from '../ApiResponseErrorHelper';
import { API_BASE_URL, DEFAULT_TIMEOUT, CURRENTLANGUAGE, getAuthToken } from '../baseUrl';
import type { ApiResponse, PagedResponse } from '../ApiResponse';
import type { IUserAuthorityService } from '../Interfaces/index';

const api = axios.create({
  baseURL: API_BASE_URL + "/UserAuthority",
  timeout: DEFAULT_TIMEOUT,
  headers: { 'Content-Type': 'application/json', Accept: 'application/json', 'X-Language': CURRENTLANGUAGE },
});

api.interceptors.request.use((config : any) => { const token = getAuthToken(); if (token) { config.headers.Authorization = `Bearer ${token}`; } return config; });

export class UserAuthorityService implements IUserAuthorityService {
  async getAll(): Promise<ApiResponse<UserAuthorityDto[]>> {
    try {
      const response = await api.get<ApiResponse<UserAuthorityDto[]>>('');
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<UserAuthorityDto[]>(error);
    }
  }

  async getById(id: number): Promise<ApiResponse<UserAuthorityDto>> {
    try {
      const response = await api.get<ApiResponse<UserAuthorityDto>>(`/${id}`);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<UserAuthorityDto>(error);
    }
  }

  async create(createDto: CreateUserAuthorityDto): Promise<ApiResponse<UserAuthorityDto>> {
    try {
      const response = await api.post<ApiResponse<UserAuthorityDto>>('', createDto);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<UserAuthorityDto>(error);
    }
  }

  async update(id: number, updateDto: UpdateUserAuthorityDto): Promise<ApiResponse<UserAuthorityDto>> {
    try {
      const response = await api.put<ApiResponse<UserAuthorityDto>>(`/${id}`, updateDto);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<UserAuthorityDto>(error);
    }
  }

  async softDelete(id: number): Promise<ApiResponse<boolean>> {
    try {
      const response = await api.delete<ApiResponse<boolean>>(`/${id}`);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<boolean>(error);
    }
  }

}
