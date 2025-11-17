import { CreateSrtTerminalLineDto, SrtTerminalLineDto, UpdateSrtTerminalLineDto } from '../../Models/index';
import axios from 'axios';
import { ApiResponseErrorHelper } from '../../ApiResponseErrorHelper';
import { API_BASE_URL, DEFAULT_TIMEOUT, CURRENTLANGUAGE, getAuthToken } from '../../baseUrl';
import { ApiResponse, PagedResponse } from '../../Models/ApiResponse';
import { ISrtTerminalLineService } from '../../Interfaces/index';

const api = axios.create({
  baseURL: API_BASE_URL + "/SrtTerminalLine",
  timeout: DEFAULT_TIMEOUT,
  headers: { 'Content-Type': 'application/json', Accept: 'application/json', 'X-Language': CURRENTLANGUAGE },
});

api.interceptors.request.use((config : any) => { const token = getAuthToken(); if (token) { config.headers.Authorization = `Bearer ${token}`; } return config; });

export class SrtTerminalLineService implements ISrtTerminalLineService {
  async getAll(): Promise<ApiResponse<SrtTerminalLineDto[]>> {
    try {
      const response = await api.get<ApiResponse<SrtTerminalLineDto[]>>('');
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<SrtTerminalLineDto[]>(error);
    }
  }

  async getById(id: number): Promise<ApiResponse<SrtTerminalLineDto>> {
    try {
      const response = await api.get<ApiResponse<SrtTerminalLineDto>>(`/${id}`);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<SrtTerminalLineDto>(error);
    }
  }

  async getByHeaderId(headerId: number): Promise<ApiResponse<SrtTerminalLineDto[]>> {
    try {
      const response = await api.get<ApiResponse<SrtTerminalLineDto[]>>(`/header/${headerId}`);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<SrtTerminalLineDto[]>(error);
    }
  }

  async getByUserId(userId: number): Promise<ApiResponse<SrtTerminalLineDto[]>> {
    try {
      const response = await api.get<ApiResponse<SrtTerminalLineDto[]>>(`/user/${userId}`);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<SrtTerminalLineDto[]>(error);
    }
  }

  async getByDateRange(startDate: string, endDate: string): Promise<ApiResponse<SrtTerminalLineDto[]>> {
    try {
      const response = await api.get<ApiResponse<SrtTerminalLineDto[]>>(`/date-range`, { params: { startDate: startDate, endDate: endDate } });
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<SrtTerminalLineDto[]>(error);
    }
  }

  async create(createDto: CreateSrtTerminalLineDto): Promise<ApiResponse<SrtTerminalLineDto>> {
    try {
      const response = await api.post<ApiResponse<SrtTerminalLineDto>>('', createDto);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<SrtTerminalLineDto>(error);
    }
  }

  async update(id: number, updateDto: UpdateSrtTerminalLineDto): Promise<ApiResponse<SrtTerminalLineDto>> {
    try {
      const response = await api.put<ApiResponse<SrtTerminalLineDto>>(`/${id}`, updateDto);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<SrtTerminalLineDto>(error);
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
