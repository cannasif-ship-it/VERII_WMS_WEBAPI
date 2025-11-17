import { CreateSitImportLineDto, SitImportLineDto, UpdateSitImportLineDto } from '../../Models/index';
import axios from 'axios';
import { ApiResponseErrorHelper } from '../../ApiResponseErrorHelper';
import { API_BASE_URL, DEFAULT_TIMEOUT, CURRENTLANGUAGE, getAuthToken } from '../../baseUrl';
import { ApiResponse, PagedResponse } from '../../Models/ApiResponse';
import { ISitImportLineService } from '../../Interfaces/index';

const api = axios.create({
  baseURL: API_BASE_URL + "/SitImportLine",
  timeout: DEFAULT_TIMEOUT,
  headers: { 'Content-Type': 'application/json', Accept: 'application/json', 'X-Language': CURRENTLANGUAGE },
});

api.interceptors.request.use((config : any) => { const token = getAuthToken(); if (token) { config.headers.Authorization = `Bearer ${token}`; } return config; });

export class SitImportLineService implements ISitImportLineService {
  async getAll(): Promise<ApiResponse<SitImportLineDto[]>> {
    try {
      const response = await api.get<ApiResponse<SitImportLineDto[]>>('');
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<SitImportLineDto[]>(error);
    }
  }

  async getById(id: number): Promise<ApiResponse<SitImportLineDto>> {
    try {
      const response = await api.get<ApiResponse<SitImportLineDto>>(`/${id}`);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<SitImportLineDto>(error);
    }
  }

  async getByLineId(lineId: number): Promise<ApiResponse<SitImportLineDto[]>> {
    try {
      const response = await api.get<ApiResponse<SitImportLineDto[]>>(`/line/${lineId}`);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<SitImportLineDto[]>(error);
    }
  }

  async getByHeaderId(headerId: number): Promise<ApiResponse<SitImportLineDto[]>> {
    try {
      const response = await api.get<ApiResponse<SitImportLineDto[]>>(`/header/${headerId}`);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<SitImportLineDto[]>(error);
    }
  }

  async getByStockCode(stockCode: string): Promise<ApiResponse<SitImportLineDto[]>> {
    try {
      const response = await api.get<ApiResponse<SitImportLineDto[]>>(`/stock/${stockCode}`);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<SitImportLineDto[]>(error);
    }
  }

  async create(createDto: CreateSitImportLineDto): Promise<ApiResponse<SitImportLineDto>> {
    try {
      const response = await api.post<ApiResponse<SitImportLineDto>>('', createDto);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<SitImportLineDto>(error);
    }
  }

  async update(id: number, updateDto: UpdateSitImportLineDto): Promise<ApiResponse<SitImportLineDto>> {
    try {
      const response = await api.put<ApiResponse<SitImportLineDto>>(`/${id}`, updateDto);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<SitImportLineDto>(error);
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
