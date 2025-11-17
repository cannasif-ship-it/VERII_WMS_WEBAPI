import { CreateSitTerminalLineDto, SitTerminalLineDto, UpdateSitTerminalLineDto } from '../../Models/index';
import axios from 'axios';
import { ApiResponseErrorHelper } from '../../ApiResponseErrorHelper';
import { API_BASE_URL, DEFAULT_TIMEOUT, CURRENTLANGUAGE, getAuthToken } from '../../baseUrl';
import { ApiResponse, PagedResponse } from '../../Models/ApiResponse';
import { ISitTerminalLineService } from '../../Interfaces/index';

const api = axios.create({
  baseURL: API_BASE_URL + "/SitTerminalLine",
  timeout: DEFAULT_TIMEOUT,
  headers: { 'Content-Type': 'application/json', Accept: 'application/json', 'X-Language': CURRENTLANGUAGE },
});

api.interceptors.request.use((config : any) => { const token = getAuthToken(); if (token) { config.headers.Authorization = `Bearer ${token}`; } return config; });

export class SitTerminalLineService implements ISitTerminalLineService {
  async getAll(): Promise<ApiResponse<SitTerminalLineDto[]>> {
    try {
      const response = await api.get<ApiResponse<SitTerminalLineDto[]>>('');
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<SitTerminalLineDto[]>(error);
    }
  }

  async getById(id: number): Promise<ApiResponse<SitTerminalLineDto>> {
    try {
      const response = await api.get<ApiResponse<SitTerminalLineDto>>(`/${id}`);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<SitTerminalLineDto>(error);
    }
  }

  async getByHeaderId(headerId: number): Promise<ApiResponse<SitTerminalLineDto[]>> {
    try {
      const response = await api.get<ApiResponse<SitTerminalLineDto[]>>(`/header/${headerId}`);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<SitTerminalLineDto[]>(error);
    }
  }

  async getByUserId(userId: number): Promise<ApiResponse<SitTerminalLineDto[]>> {
    try {
      const response = await api.get<ApiResponse<SitTerminalLineDto[]>>(`/user/${userId}`);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<SitTerminalLineDto[]>(error);
    }
  }

  async getByDateRange(startDate: string, endDate: string): Promise<ApiResponse<SitTerminalLineDto[]>> {
    try {
      const response = await api.get<ApiResponse<SitTerminalLineDto[]>>(`/date-range`, { params: { startDate: startDate, endDate: endDate } });
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<SitTerminalLineDto[]>(error);
    }
  }

  async create(createDto: CreateSitTerminalLineDto): Promise<ApiResponse<SitTerminalLineDto>> {
    try {
      const response = await api.post<ApiResponse<SitTerminalLineDto>>('', createDto);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<SitTerminalLineDto>(error);
    }
  }

  async update(id: number, updateDto: UpdateSitTerminalLineDto): Promise<ApiResponse<SitTerminalLineDto>> {
    try {
      const response = await api.put<ApiResponse<SitTerminalLineDto>>(`/${id}`, updateDto);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<SitTerminalLineDto>(error);
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
