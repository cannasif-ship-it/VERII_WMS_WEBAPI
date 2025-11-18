import type { CreateMobileUserGroupMatchDto, MobileUserGroupMatchDto, UpdateMobileUserGroupMatchDto } from '../../Models/index';
import axios from 'axios';
import { ApiResponseErrorHelper } from '../../ApiResponseErrorHelper';
import { API_BASE_URL, DEFAULT_TIMEOUT, CURRENTLANGUAGE, getAuthToken } from '../../baseUrl';
import type { ApiResponse, PagedResponse } from '../../ApiResponse';
import type { IMobileUserGroupMatchService } from '../../Interfaces/index';

const api = axios.create({
  baseURL: API_BASE_URL + "/MobileUserGroupMatch",
  timeout: DEFAULT_TIMEOUT,
  headers: { 'Content-Type': 'application/json', Accept: 'application/json', 'X-Language': CURRENTLANGUAGE },
});

api.interceptors.request.use((config : any) => { const token = getAuthToken(); if (token) { config.headers.Authorization = `Bearer ${token}`; } return config; });

export class MobileUserGroupMatchService implements IMobileUserGroupMatchService {
  async getAll(): Promise<ApiResponse<MobileUserGroupMatchDto[]>> {
    try {
      const response = await api.get<ApiResponse<MobileUserGroupMatchDto[]>>('');
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<MobileUserGroupMatchDto[]>(error);
    }
  }

  async getById(id: number): Promise<ApiResponse<MobileUserGroupMatchDto>> {
    try {
      const response = await api.get<ApiResponse<MobileUserGroupMatchDto>>(`/${id}`);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<MobileUserGroupMatchDto>(error);
    }
  }

  async getByUserId(userId: number): Promise<ApiResponse<MobileUserGroupMatchDto[]>> {
    try {
      const response = await api.get<ApiResponse<MobileUserGroupMatchDto[]>>(`/by-user/${userId}`);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<MobileUserGroupMatchDto[]>(error);
    }
  }

  async getByGroupCode(groupCode: string): Promise<ApiResponse<MobileUserGroupMatchDto[]>> {
    try {
      const response = await api.get<ApiResponse<MobileUserGroupMatchDto[]>>(`/by-group-code/${groupCode}`);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<MobileUserGroupMatchDto[]>(error);
    }
  }

  async create(createDto: CreateMobileUserGroupMatchDto): Promise<ApiResponse<MobileUserGroupMatchDto>> {
    try {
      const response = await api.post<ApiResponse<MobileUserGroupMatchDto>>('', createDto);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<MobileUserGroupMatchDto>(error);
    }
  }

  async update(id: number, updateDto: UpdateMobileUserGroupMatchDto): Promise<ApiResponse<MobileUserGroupMatchDto>> {
    try {
      const response = await api.put<ApiResponse<MobileUserGroupMatchDto>>(`/${id}`, updateDto);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<MobileUserGroupMatchDto>(error);
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
