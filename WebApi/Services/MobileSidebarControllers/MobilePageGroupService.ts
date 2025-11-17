import { CreateMobilePageGroupDto, MobilePageGroupDto, UpdateMobilePageGroupDto } from '../../Models/index';
import axios from 'axios';
import { ApiResponseErrorHelper } from '../../ApiResponseErrorHelper';
import { API_BASE_URL, DEFAULT_TIMEOUT, CURRENTLANGUAGE, getAuthToken } from '../../baseUrl';
import { ApiResponse, PagedResponse } from '../../Models/ApiResponse';
import { IMobilePageGroupService } from '../../Interfaces/index';

const api = axios.create({
  baseURL: API_BASE_URL + "/MobilePageGroup",
  timeout: DEFAULT_TIMEOUT,
  headers: { 'Content-Type': 'application/json', Accept: 'application/json', 'X-Language': CURRENTLANGUAGE },
});

api.interceptors.request.use((config : any) => { const token = getAuthToken(); if (token) { config.headers.Authorization = `Bearer ${token}`; } return config; });

export class MobilePageGroupService implements IMobilePageGroupService {
  async getAll(): Promise<ApiResponse<MobilePageGroupDto[]>> {
    try {
      const response = await api.get<ApiResponse<MobilePageGroupDto[]>>('');
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<MobilePageGroupDto[]>(error);
    }
  }

  async getById(id: number): Promise<ApiResponse<MobilePageGroupDto>> {
    try {
      const response = await api.get<ApiResponse<MobilePageGroupDto>>(`/${id}`);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<MobilePageGroupDto>(error);
    }
  }

  async getByGroupCode(groupCode: string): Promise<ApiResponse<MobilePageGroupDto[]>> {
    try {
      const response = await api.get<ApiResponse<MobilePageGroupDto[]>>(`/by-group-code/${groupCode}`);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<MobilePageGroupDto[]>(error);
    }
  }

  async getByMenuHeaderId(menuHeaderId: number): Promise<ApiResponse<MobilePageGroupDto[]>> {
    try {
      const response = await api.get<ApiResponse<MobilePageGroupDto[]>>(`/by-menu-header/${menuHeaderId}`);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<MobilePageGroupDto[]>(error);
    }
  }

  async getByMenuLineId(menuLineId: number): Promise<ApiResponse<MobilePageGroupDto[]>> {
    try {
      const response = await api.get<ApiResponse<MobilePageGroupDto[]>>(`/by-menu-line/${menuLineId}`);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<MobilePageGroupDto[]>(error);
    }
  }

  async getMobilPageGroupsByGroupCode(): Promise<ApiResponse<MobilePageGroupDto[]>> {
    try {
      const response = await api.get<ApiResponse<MobilePageGroupDto[]>>(`/grouped-by-group-code`);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<MobilePageGroupDto[]>(error);
    }
  }

  async create(createDto: CreateMobilePageGroupDto): Promise<ApiResponse<MobilePageGroupDto>> {
    try {
      const response = await api.post<ApiResponse<MobilePageGroupDto>>('', createDto);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<MobilePageGroupDto>(error);
    }
  }

  async update(id: number, updateDto: UpdateMobilePageGroupDto): Promise<ApiResponse<MobilePageGroupDto>> {
    try {
      const response = await api.put<ApiResponse<MobilePageGroupDto>>(`/${id}`, updateDto);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<MobilePageGroupDto>(error);
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
