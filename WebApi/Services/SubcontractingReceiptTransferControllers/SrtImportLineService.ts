import type { CreateSrtImportLineDto, SrtImportLineDto, UpdateSrtImportLineDto } from '../../Models/index';
import axios from 'axios';
import { ApiResponseErrorHelper } from '../../ApiResponseErrorHelper';
import { API_BASE_URL, DEFAULT_TIMEOUT, CURRENTLANGUAGE, getAuthToken } from '../../baseUrl';
import type { ApiResponse, PagedResponse } from '../../Models/ApiResponse';
import type { ISrtImportLineService } from '../../Interfaces/index';

const api = axios.create({
  baseURL: API_BASE_URL + "/SrtImportLine",
  timeout: DEFAULT_TIMEOUT,
  headers: { 'Content-Type': 'application/json', Accept: 'application/json', 'X-Language': CURRENTLANGUAGE },
});

api.interceptors.request.use((config : any) => { const token = getAuthToken(); if (token) { config.headers.Authorization = `Bearer ${token}`; } return config; });

export class SrtImportLineService implements ISrtImportLineService {
  async getAll(): Promise<ApiResponse<SrtImportLineDto[]>> {
    try {
      const response = await api.get<ApiResponse<SrtImportLineDto[]>>('');
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<SrtImportLineDto[]>(error);
    }
  }

  async getById(id: number): Promise<ApiResponse<SrtImportLineDto>> {
    try {
      const response = await api.get<ApiResponse<SrtImportLineDto>>(`/${id}`);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<SrtImportLineDto>(error);
    }
  }

  async getByHeaderId(headerId: number): Promise<ApiResponse<SrtImportLineDto[]>> {
    try {
      const response = await api.get<ApiResponse<SrtImportLineDto[]>>(`/header/${headerId}`);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<SrtImportLineDto[]>(error);
    }
  }

  async getByLineId(lineId: number): Promise<ApiResponse<SrtImportLineDto[]>> {
    try {
      const response = await api.get<ApiResponse<SrtImportLineDto[]>>(`/line/${lineId}`);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<SrtImportLineDto[]>(error);
    }
  }

  async getByStockCode(stockCode: string): Promise<ApiResponse<SrtImportLineDto[]>> {
    try {
      const response = await api.get<ApiResponse<SrtImportLineDto[]>>(`/stock/${stockCode}`);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<SrtImportLineDto[]>(error);
    }
  }

  async create(createDto: CreateSrtImportLineDto): Promise<ApiResponse<SrtImportLineDto>> {
    try {
      const response = await api.post<ApiResponse<SrtImportLineDto>>('', createDto);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<SrtImportLineDto>(error);
    }
  }

  async update(id: number, updateDto: UpdateSrtImportLineDto): Promise<ApiResponse<SrtImportLineDto>> {
    try {
      const response = await api.put<ApiResponse<SrtImportLineDto>>(`/${id}`, updateDto);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<SrtImportLineDto>(error);
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
