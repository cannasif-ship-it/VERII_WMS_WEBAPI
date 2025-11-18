import type { CreateWiTerminalLineDto, UpdateWiTerminalLineDto, WiTerminalLineDto } from '../../Models/index';
import axios from 'axios';
import { ApiResponseErrorHelper } from '../../ApiResponseErrorHelper';
import { API_BASE_URL, DEFAULT_TIMEOUT, CURRENTLANGUAGE, getAuthToken } from '../../baseUrl';
import type { ApiResponse, PagedResponse } from '../../ApiResponse';
import type { IWiTerminalLineService } from '../../Interfaces/index';

const api = axios.create({
  baseURL: API_BASE_URL + "/WiTerminalLine",
  timeout: DEFAULT_TIMEOUT,
  headers: { 'Content-Type': 'application/json', Accept: 'application/json', 'X-Language': CURRENTLANGUAGE },
});

api.interceptors.request.use((config : any) => { const token = getAuthToken(); if (token) { config.headers.Authorization = `Bearer ${token}`; } return config; });

export class WiTerminalLineService implements IWiTerminalLineService {
  async getAll(): Promise<ApiResponse<WiTerminalLineDto[]>> {
    try {
      const response = await api.get<ApiResponse<WiTerminalLineDto[]>>('');
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<WiTerminalLineDto[]>(error);
    }
  }

  async getById(id: number): Promise<ApiResponse<WiTerminalLineDto>> {
    try {
      const response = await api.get<ApiResponse<WiTerminalLineDto>>(`/${id}`);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<WiTerminalLineDto>(error);
    }
  }

  async getByHeaderId(headerId: number): Promise<ApiResponse<WiTerminalLineDto[]>> {
    try {
      const response = await api.get<ApiResponse<WiTerminalLineDto[]>>(`/header/${headerId}`);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<WiTerminalLineDto[]>(error);
    }
  }

  async getByUserId(userId: number): Promise<ApiResponse<WiTerminalLineDto[]>> {
    try {
      const response = await api.get<ApiResponse<WiTerminalLineDto[]>>(`/user/${userId}`);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<WiTerminalLineDto[]>(error);
    }
  }

  async getByDateRange(startDate: Date, endDate: Date): Promise<ApiResponse<WiTerminalLineDto[]>> {
    try {
      const response = await api.get<ApiResponse<WiTerminalLineDto[]>>(`/date-range`, { params: { startDate: startDate, endDate: endDate } });
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<WiTerminalLineDto[]>(error);
    }
  }

  async create(createDto: CreateWiTerminalLineDto): Promise<ApiResponse<WiTerminalLineDto>> {
    try {
      const response = await api.post<ApiResponse<WiTerminalLineDto>>('', createDto);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<WiTerminalLineDto>(error);
    }
  }

  async update(id: number, updateDto: UpdateWiTerminalLineDto): Promise<ApiResponse<WiTerminalLineDto>> {
    try {
      const response = await api.put<ApiResponse<WiTerminalLineDto>>(`/${id}`, updateDto);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<WiTerminalLineDto>(error);
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
