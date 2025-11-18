import type { CreateWtTerminalLineDto, UpdateWtTerminalLineDto, WtTerminalLineDto } from '../../Models/index';
import axios from 'axios';
import { ApiResponseErrorHelper } from '../../ApiResponseErrorHelper';
import { API_BASE_URL, DEFAULT_TIMEOUT, CURRENTLANGUAGE, getAuthToken } from '../../baseUrl';
import type { ApiResponse, PagedResponse } from '../../Models/ApiResponse';
import type { IWtTerminalLineService } from '../../Interfaces/index';

const api = axios.create({
  baseURL: API_BASE_URL + "/WtTerminalLine",
  timeout: DEFAULT_TIMEOUT,
  headers: { 'Content-Type': 'application/json', Accept: 'application/json', 'X-Language': CURRENTLANGUAGE },
});

api.interceptors.request.use((config : any) => { const token = getAuthToken(); if (token) { config.headers.Authorization = `Bearer ${token}`; } return config; });

export class WtTerminalLineService implements IWtTerminalLineService {
  async getAll(): Promise<ApiResponse<WtTerminalLineDto[]>> {
    try {
      const response = await api.get<ApiResponse<WtTerminalLineDto[]>>('');
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<WtTerminalLineDto[]>(error);
    }
  }

  async getById(id: number): Promise<ApiResponse<WtTerminalLineDto>> {
    try {
      const response = await api.get<ApiResponse<WtTerminalLineDto>>(`/${id}`);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<WtTerminalLineDto>(error);
    }
  }

  async getByHeaderId(headerId: number): Promise<ApiResponse<WtTerminalLineDto[]>> {
    try {
      const response = await api.get<ApiResponse<WtTerminalLineDto[]>>(`/header/${headerId}`);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<WtTerminalLineDto[]>(error);
    }
  }

  async getByUserId(userId: number): Promise<ApiResponse<WtTerminalLineDto[]>> {
    try {
      const response = await api.get<ApiResponse<WtTerminalLineDto[]>>(`/user/${userId}`);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<WtTerminalLineDto[]>(error);
    }
  }

  async getByDateRange(startDate: Date, endDate: Date): Promise<ApiResponse<WtTerminalLineDto[]>> {
    try {
      const response = await api.get<ApiResponse<WtTerminalLineDto[]>>(`/daterange`, { params: { startDate: startDate, endDate: endDate } });
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<WtTerminalLineDto[]>(error);
    }
  }

  async create(createDto: CreateWtTerminalLineDto): Promise<ApiResponse<WtTerminalLineDto>> {
    try {
      const response = await api.post<ApiResponse<WtTerminalLineDto>>('', createDto);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<WtTerminalLineDto>(error);
    }
  }

  async update(id: number, updateDto: UpdateWtTerminalLineDto): Promise<ApiResponse<WtTerminalLineDto>> {
    try {
      const response = await api.put<ApiResponse<WtTerminalLineDto>>(`/${id}`, updateDto);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<WtTerminalLineDto>(error);
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
