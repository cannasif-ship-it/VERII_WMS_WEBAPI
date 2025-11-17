import { CreateWoImportLineDto, UpdateWoImportLineDto, WoImportLineDto } from '../../Models/index';
import axios from 'axios';
import { ApiResponseErrorHelper } from '../../ApiResponseErrorHelper';
import { API_BASE_URL, DEFAULT_TIMEOUT, CURRENTLANGUAGE, getAuthToken } from '../../baseUrl';
import { ApiResponse, PagedResponse } from '../../Models/ApiResponse';
import { IWoImportLineService } from '../../Interfaces/index';

const api = axios.create({
  baseURL: API_BASE_URL + "/WoImportLine",
  timeout: DEFAULT_TIMEOUT,
  headers: { 'Content-Type': 'application/json', Accept: 'application/json', 'X-Language': CURRENTLANGUAGE },
});

api.interceptors.request.use((config : any) => { const token = getAuthToken(); if (token) { config.headers.Authorization = `Bearer ${token}`; } return config; });

export class WoImportLineService implements IWoImportLineService {
  async getAll(): Promise<ApiResponse<WoImportLineDto[]>> {
    try {
      const response = await api.get<ApiResponse<WoImportLineDto[]>>('');
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<WoImportLineDto[]>(error);
    }
  }

  async getById(id: number): Promise<ApiResponse<WoImportLineDto>> {
    try {
      const response = await api.get<ApiResponse<WoImportLineDto>>(`/${id}`);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<WoImportLineDto>(error);
    }
  }

  async getByLineId(lineId: number): Promise<ApiResponse<WoImportLineDto[]>> {
    try {
      const response = await api.get<ApiResponse<WoImportLineDto[]>>(`/line/${lineId}`);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<WoImportLineDto[]>(error);
    }
  }

  async getByHeaderId(headerId: number): Promise<ApiResponse<WoImportLineDto[]>> {
    try {
      const response = await api.get<ApiResponse<WoImportLineDto[]>>(`/header/${headerId}`);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<WoImportLineDto[]>(error);
    }
  }

  async getByStockCode(stockCode: string): Promise<ApiResponse<WoImportLineDto[]>> {
    try {
      const response = await api.get<ApiResponse<WoImportLineDto[]>>(`/stock/${stockCode}`);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<WoImportLineDto[]>(error);
    }
  }

  async create(createDto: CreateWoImportLineDto): Promise<ApiResponse<WoImportLineDto>> {
    try {
      const response = await api.post<ApiResponse<WoImportLineDto>>('', createDto);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<WoImportLineDto>(error);
    }
  }

  async update(id: number, updateDto: UpdateWoImportLineDto): Promise<ApiResponse<WoImportLineDto>> {
    try {
      const response = await api.put<ApiResponse<WoImportLineDto>>(`/${id}`, updateDto);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<WoImportLineDto>(error);
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
