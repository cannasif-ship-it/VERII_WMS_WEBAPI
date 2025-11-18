import type { CreatePtTerminalLineDto, PtTerminalLineDto, UpdatePtTerminalLineDto } from '../../Models/index';
import axios from 'axios';
import { ApiResponseErrorHelper } from '../../ApiResponseErrorHelper';
import { API_BASE_URL, DEFAULT_TIMEOUT, CURRENTLANGUAGE, getAuthToken } from '../../baseUrl';
import type { ApiResponse, PagedResponse } from '../../ApiResponse';
import type { IPtTerminalLineService } from '../../Interfaces/index';

const api = axios.create({
  baseURL: API_BASE_URL + "/PtTerminalLine",
  timeout: DEFAULT_TIMEOUT,
  headers: { 'Content-Type': 'application/json', Accept: 'application/json', 'X-Language': CURRENTLANGUAGE },
});

api.interceptors.request.use((config : any) => { const token = getAuthToken(); if (token) { config.headers.Authorization = `Bearer ${token}`; } return config; });

export class PtTerminalLineService implements IPtTerminalLineService {
  async getAll(): Promise<ApiResponse<PtTerminalLineDto[]>> {
    try {
      const response = await api.get<ApiResponse<PtTerminalLineDto[]>>('');
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<PtTerminalLineDto[]>(error);
    }
  }

  async getById(id: number): Promise<ApiResponse<PtTerminalLineDto>> {
    try {
      const response = await api.get<ApiResponse<PtTerminalLineDto>>(`/${id}`);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<PtTerminalLineDto>(error);
    }
  }

  async getByHeaderId(headerId: number): Promise<ApiResponse<PtTerminalLineDto[]>> {
    try {
      const response = await api.get<ApiResponse<PtTerminalLineDto[]>>(`/header/${headerId}`);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<PtTerminalLineDto[]>(error);
    }
  }

  async getByUserId(userId: number): Promise<ApiResponse<PtTerminalLineDto[]>> {
    try {
      const response = await api.get<ApiResponse<PtTerminalLineDto[]>>(`/user/${userId}`);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<PtTerminalLineDto[]>(error);
    }
  }

  async getByDateRange(startDate: Date, endDate: Date): Promise<ApiResponse<PtTerminalLineDto[]>> {
    try {
      const response = await api.get<ApiResponse<PtTerminalLineDto[]>>(`/date-range`, { params: { startDate: startDate, endDate: endDate } });
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<PtTerminalLineDto[]>(error);
    }
  }

  async create(createDto: CreatePtTerminalLineDto): Promise<ApiResponse<PtTerminalLineDto>> {
    try {
      const response = await api.post<ApiResponse<PtTerminalLineDto>>('', createDto);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<PtTerminalLineDto>(error);
    }
  }

  async update(id: number, updateDto: UpdatePtTerminalLineDto): Promise<ApiResponse<PtTerminalLineDto>> {
    try {
      const response = await api.put<ApiResponse<PtTerminalLineDto>>(`/${id}`, updateDto);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<PtTerminalLineDto>(error);
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
