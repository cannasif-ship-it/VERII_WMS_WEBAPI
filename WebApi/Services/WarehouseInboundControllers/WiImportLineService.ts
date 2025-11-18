import type { CreateWiImportLineDto, UpdateWiImportLineDto, WiImportLineDto } from '../../Models/index';
import axios from 'axios';
import { ApiResponseErrorHelper } from '../../ApiResponseErrorHelper';
import { API_BASE_URL, DEFAULT_TIMEOUT, CURRENTLANGUAGE, getAuthToken } from '../../baseUrl';
import type { ApiResponse, PagedResponse } from '../../Models/ApiResponse';
import type { IWiImportLineService } from '../../Interfaces/index';

const api = axios.create({
  baseURL: API_BASE_URL + "/WiImportLine",
  timeout: DEFAULT_TIMEOUT,
  headers: { 'Content-Type': 'application/json', Accept: 'application/json', 'X-Language': CURRENTLANGUAGE },
});

api.interceptors.request.use((config : any) => { const token = getAuthToken(); if (token) { config.headers.Authorization = `Bearer ${token}`; } return config; });

export class WiImportLineService implements IWiImportLineService {
  async getAll(): Promise<ApiResponse<WiImportLineDto[]>> {
    try {
      const response = await api.get<ApiResponse<WiImportLineDto[]>>('');
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<WiImportLineDto[]>(error);
    }
  }

  async getById(id: number): Promise<ApiResponse<WiImportLineDto>> {
    try {
      const response = await api.get<ApiResponse<WiImportLineDto>>(`/${id}`);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<WiImportLineDto>(error);
    }
  }

  async getByLineId(lineId: number): Promise<ApiResponse<WiImportLineDto[]>> {
    try {
      const response = await api.get<ApiResponse<WiImportLineDto[]>>(`/line/${lineId}`);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<WiImportLineDto[]>(error);
    }
  }

  async getByHeaderId(headerId: number): Promise<ApiResponse<WiImportLineDto[]>> {
    try {
      const response = await api.get<ApiResponse<WiImportLineDto[]>>(`/header/${headerId}`);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<WiImportLineDto[]>(error);
    }
  }

  async getByStockCode(stockCode: string): Promise<ApiResponse<WiImportLineDto[]>> {
    try {
      const response = await api.get<ApiResponse<WiImportLineDto[]>>(`/stock/${stockCode}`);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<WiImportLineDto[]>(error);
    }
  }

  async create(createDto: CreateWiImportLineDto): Promise<ApiResponse<WiImportLineDto>> {
    try {
      const response = await api.post<ApiResponse<WiImportLineDto>>('', createDto);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<WiImportLineDto>(error);
    }
  }

  async update(id: number, updateDto: UpdateWiImportLineDto): Promise<ApiResponse<WiImportLineDto>> {
    try {
      const response = await api.put<ApiResponse<WiImportLineDto>>(`/${id}`, updateDto);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<WiImportLineDto>(error);
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
