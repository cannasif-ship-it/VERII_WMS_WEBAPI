import type { CreateMobilemenuHeaderDto, MobilemenuHeaderDto, UpdateMobilemenuHeaderDto } from '../../Models/index';
import axios from 'axios';
import { ApiResponseErrorHelper } from '../../ApiResponseErrorHelper';
import { API_BASE_URL, DEFAULT_TIMEOUT, CURRENTLANGUAGE, getAuthToken } from '../../baseUrl';
import type { ApiResponse, PagedResponse } from '../../Models/ApiResponse';
import type { IMobilemenuHeaderService } from '../../Interfaces/index';

const api = axios.create({
  baseURL: API_BASE_URL + "/MobilemenuHeader",
  timeout: DEFAULT_TIMEOUT,
  headers: { 'Content-Type': 'application/json', Accept: 'application/json', 'X-Language': CURRENTLANGUAGE },
});

api.interceptors.request.use((config : any) => { const token = getAuthToken(); if (token) { config.headers.Authorization = `Bearer ${token}`; } return config; });

export class MobilemenuHeaderService implements IMobilemenuHeaderService {
  async getAll(): Promise<ApiResponse<MobilemenuHeaderDto[]>> {
    try {
      const response = await api.get<ApiResponse<MobilemenuHeaderDto[]>>('');
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<MobilemenuHeaderDto[]>(error);
    }
  }

  async getById(id: number): Promise<ApiResponse<MobilemenuHeaderDto>> {
    try {
      const response = await api.get<ApiResponse<MobilemenuHeaderDto>>(`/${id}`);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<MobilemenuHeaderDto>(error);
    }
  }

  async getByMenuId(menuId: string): Promise<ApiResponse<MobilemenuHeaderDto>> {
    try {
      const response = await api.get<ApiResponse<MobilemenuHeaderDto>>(`/by-menu-id/${menuId}`);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<MobilemenuHeaderDto>(error);
    }
  }

  async getByTitle(title: string): Promise<ApiResponse<MobilemenuHeaderDto[]>> {
    try {
      const response = await api.get<ApiResponse<MobilemenuHeaderDto[]>>(`/by-title/${title}`);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<MobilemenuHeaderDto[]>(error);
    }
  }

  async getOpenMenus(): Promise<ApiResponse<MobilemenuHeaderDto[]>> {
    try {
      const response = await api.get<ApiResponse<MobilemenuHeaderDto[]>>(`/open-menus`);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<MobilemenuHeaderDto[]>(error);
    }
  }

  async create(createDto: CreateMobilemenuHeaderDto): Promise<ApiResponse<MobilemenuHeaderDto>> {
    try {
      const response = await api.post<ApiResponse<MobilemenuHeaderDto>>('', createDto);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<MobilemenuHeaderDto>(error);
    }
  }

  async update(id: number, updateDto: UpdateMobilemenuHeaderDto): Promise<ApiResponse<MobilemenuHeaderDto>> {
    try {
      const response = await api.put<ApiResponse<MobilemenuHeaderDto>>(`/${id}`, updateDto);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<MobilemenuHeaderDto>(error);
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
