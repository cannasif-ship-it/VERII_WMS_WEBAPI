import axios, { AxiosRequestConfig } from 'axios';
import { API_BASE_URL, DEFAULT_TIMEOUT, CURRENTLANGUAGE, getAuthToken } from '../baseUrl';
import { ApiResponseErrorHelper } from '../ApiResponseErrorHelper';
import { IPlatformUserGroupMatchService } from '../Interfaces/IPlatformUserGroupMatchService';
import { ApiResponse } from '../Models/ApiResponse';
import { PlatformUserGroupMatchDto, CreatePlatformUserGroupMatchDto, UpdatePlatformUserGroupMatchDto } from '../Models/PlatformUserGroupMatchDtos';

const api = axios.create({
  baseURL: API_BASE_URL + "/PlatformUserGroupMatch",
  timeout: DEFAULT_TIMEOUT,
  headers: { 
    'Content-Type': 'application/json', 
    Accept: 'application/json',
    'X-Language': CURRENTLANGUAGE 
  },
});

// Request interceptor to add auth token
api.interceptors.request.use((config : AxiosRequestConfig) => {
  const token = getAuthToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export class PlatformUserGroupMatchService implements IPlatformUserGroupMatchService {
  async getAll(): Promise<ApiResponse<PlatformUserGroupMatchDto[]>> {
    try {
      const response = await api.get('/');
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<PlatformUserGroupMatchDto[]>(error);
    }
  }

  async getById(id: number): Promise<ApiResponse<PlatformUserGroupMatchDto>> {
    const response = await api.get<ApiResponse<PlatformUserGroupMatchDto>>(`/${id}`);
    return response.data;
  }

  async create(createDto: CreatePlatformUserGroupMatchDto): Promise<ApiResponse<PlatformUserGroupMatchDto>> {
    const response = await api.post<ApiResponse<PlatformUserGroupMatchDto>>('/', createDto);
    return response.data;
  }

  async update(id: number, updateDto: UpdatePlatformUserGroupMatchDto): Promise<ApiResponse<PlatformUserGroupMatchDto>> {
    const response = await api.put<ApiResponse<PlatformUserGroupMatchDto>>(`/${id}`, updateDto);
    return response.data;
  }

  async softDelete(id: number): Promise<ApiResponse<boolean>> {
    const response = await api.delete<ApiResponse<boolean>>(`/${id}/soft`);
    return response.data;
  }

  async exists(id: number): Promise<ApiResponse<boolean>> {
    const response = await api.get<ApiResponse<boolean>>(`/${id}/exists`);
    return response.data;
  }

  async getByUserId(userId: number): Promise<ApiResponse<PlatformUserGroupMatchDto[]>> {
    const response = await api.get<ApiResponse<PlatformUserGroupMatchDto[]>>(`/by-user-id/${userId}`);
    return response.data;
  }

  async getByGroupCode(groupCode: string): Promise<ApiResponse<PlatformUserGroupMatchDto[]>> {
    const response = await api.get<ApiResponse<PlatformUserGroupMatchDto[]>>(`/by-group-code/${encodeURIComponent(groupCode)}`);
    return response.data;
  }
}


