import type { CreateWoTerminalLineDto, UpdateWoTerminalLineDto, WoTerminalLineDto } from '../../Models/index';
import axios from 'axios';
import { ApiResponseErrorHelper } from '../../ApiResponseErrorHelper';
import { API_BASE_URL, DEFAULT_TIMEOUT, CURRENTLANGUAGE, getAuthToken } from '../../baseUrl';
import type { ApiResponse, PagedResponse } from '../../Models/ApiResponse';
import type { IWoTerminalLineService } from '../../Interfaces/index';

const api = axios.create({
  baseURL: API_BASE_URL + "/WoTerminalLine",
  timeout: DEFAULT_TIMEOUT,
  headers: { 'Content-Type': 'application/json', Accept: 'application/json', 'X-Language': CURRENTLANGUAGE },
});

api.interceptors.request.use((config : any) => { const token = getAuthToken(); if (token) { config.headers.Authorization = `Bearer ${token}`; } return config; });

export class WoTerminalLineService implements IWoTerminalLineService {
  async getAll(): Promise<ApiResponse<WoTerminalLineDto[]>> {
    try {
      const response = await api.get<ApiResponse<WoTerminalLineDto[]>>('');
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<WoTerminalLineDto[]>(error);
    }
  }

  async getById(id: number): Promise<ApiResponse<WoTerminalLineDto>> {
    try {
      const response = await api.get<ApiResponse<WoTerminalLineDto>>(`/${id}`);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<WoTerminalLineDto>(error);
    }
  }

  async getByHeaderId(headerId: number): Promise<ApiResponse<WoTerminalLineDto[]>> {
    try {
      const response = await api.get<ApiResponse<WoTerminalLineDto[]>>(`/header/${headerId}`);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<WoTerminalLineDto[]>(error);
    }
  }

  async getByUserId(userId: number): Promise<ApiResponse<WoTerminalLineDto[]>> {
    try {
      const response = await api.get<ApiResponse<WoTerminalLineDto[]>>(`/user/${userId}`);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<WoTerminalLineDto[]>(error);
    }
  }

  async getByDateRange(startDate: Date, endDate: Date): Promise<ApiResponse<WoTerminalLineDto[]>> {
    try {
      const response = await api.get<ApiResponse<WoTerminalLineDto[]>>(`/date-range`, { params: { startDate: startDate, endDate: endDate } });
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<WoTerminalLineDto[]>(error);
    }
  }

  async create(createDto: CreateWoTerminalLineDto): Promise<ApiResponse<WoTerminalLineDto>> {
    try {
      const response = await api.post<ApiResponse<WoTerminalLineDto>>('', createDto);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<WoTerminalLineDto>(error);
    }
  }

  async update(id: number, updateDto: UpdateWoTerminalLineDto): Promise<ApiResponse<WoTerminalLineDto>> {
    try {
      const response = await api.put<ApiResponse<WoTerminalLineDto>>(`/${id}`, updateDto);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<WoTerminalLineDto>(error);
    }
  }

  async softDelete(id: number): Promise<ApiResponse<boolean>> {
    try {
      const response = await api.delete<ApiResponse<boolean>>(`/${id}/soft`);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<boolean>(error);
    }
  }

}
