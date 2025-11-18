import type { CreateGrImportLDto, GrImportLDto, UpdateGrImportLDto } from '../../Models/index';
import axios from 'axios';
import { ApiResponseErrorHelper } from '../../ApiResponseErrorHelper';
import { API_BASE_URL, DEFAULT_TIMEOUT, CURRENTLANGUAGE, getAuthToken } from '../../baseUrl';
import type { ApiResponse, PagedResponse } from '../../ApiResponse';
import type { IGrImportLService } from '../../Interfaces/index';

const api = axios.create({
  baseURL: API_BASE_URL + "/GrImportL",
  timeout: DEFAULT_TIMEOUT,
  headers: { 'Content-Type': 'application/json', Accept: 'application/json', 'X-Language': CURRENTLANGUAGE },
});

api.interceptors.request.use((config : any) => { const token = getAuthToken(); if (token) { config.headers.Authorization = `Bearer ${token}`; } return config; });

export class GrImportLService implements IGrImportLService {
  async getAll(): Promise<ApiResponse<GrImportLDto[]>> {
    try {
      const response = await api.get<ApiResponse<GrImportLDto[]>>('');
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<GrImportLDto[]>(error);
    }
  }

  async getById(id: number): Promise<ApiResponse<GrImportLDto>> {
    try {
      const response = await api.get<ApiResponse<GrImportLDto>>(`/${id}`);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<GrImportLDto>(error);
    }
  }

  async getByHeaderId(headerId: number): Promise<ApiResponse<GrImportLDto[]>> {
    try {
      const response = await api.get<ApiResponse<GrImportLDto[]>>(`/by-header/${headerId}`);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<GrImportLDto[]>(error);
    }
  }

  async getByLineId(lineId: number): Promise<ApiResponse<GrImportLDto[]>> {
    try {
      const response = await api.get<ApiResponse<GrImportLDto[]>>(`/by-line/${lineId}`);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<GrImportLDto[]>(error);
    }
  }

  async getByStockCode(stockCode: string): Promise<ApiResponse<GrImportLDto[]>> {
    try {
      const response = await api.get<ApiResponse<GrImportLDto[]>>(`/by-stock-code/${stockCode}`);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<GrImportLDto[]>(error);
    }
  }

  async create(createDto: CreateGrImportLDto): Promise<ApiResponse<GrImportLDto>> {
    try {
      const response = await api.post<ApiResponse<GrImportLDto>>('', createDto);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<GrImportLDto>(error);
    }
  }

  async update(id: number, updateDto: UpdateGrImportLDto): Promise<ApiResponse<GrImportLDto>> {
    try {
      const response = await api.put<ApiResponse<GrImportLDto>>(`/${id}`, updateDto);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<GrImportLDto>(error);
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

  async getPaged(pageNumber: number, pageSize: number, sortBy: string, sortDirection: string): Promise<ApiResponse<PagedResponse<GrImportLDto>>> {
    try {
      const response = await api.get<ApiResponse<PagedResponse<GrImportLDto>>>(`/paged`, { params: { pageNumber: pageNumber, pageSize: pageSize, sortBy: sortBy, sortDirection: sortDirection } });
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<PagedResponse<GrImportLDto>>(error);
    }
  }

}
