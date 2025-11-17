import { CreatePtImportLineDto, PtImportLineDto, UpdatePtImportLineDto } from '../../Models/index';
import axios from 'axios';
import { ApiResponseErrorHelper } from '../../ApiResponseErrorHelper';
import { API_BASE_URL, DEFAULT_TIMEOUT, CURRENTLANGUAGE, getAuthToken } from '../../baseUrl';
import { ApiResponse, PagedResponse } from '../../Models/ApiResponse';
import { IPtImportLineService } from '../../Interfaces/index';

const api = axios.create({
  baseURL: API_BASE_URL + "/PtImportLine",
  timeout: DEFAULT_TIMEOUT,
  headers: { 'Content-Type': 'application/json', Accept: 'application/json', 'X-Language': CURRENTLANGUAGE },
});

api.interceptors.request.use((config : any) => { const token = getAuthToken(); if (token) { config.headers.Authorization = `Bearer ${token}`; } return config; });

export class PtImportLineService implements IPtImportLineService {
  async getAll(): Promise<ApiResponse<PtImportLineDto[]>> {
    try {
      const response = await api.get<ApiResponse<PtImportLineDto[]>>('');
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<PtImportLineDto[]>(error);
    }
  }

  async getById(id: number): Promise<ApiResponse<PtImportLineDto>> {
    try {
      const response = await api.get<ApiResponse<PtImportLineDto>>(`/${id}`);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<PtImportLineDto>(error);
    }
  }

  async getByLineId(lineId: number): Promise<ApiResponse<PtImportLineDto[]>> {
    try {
      const response = await api.get<ApiResponse<PtImportLineDto[]>>(`/line/${lineId}`);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<PtImportLineDto[]>(error);
    }
  }

  async getByHeaderId(headerId: number): Promise<ApiResponse<PtImportLineDto[]>> {
    try {
      const response = await api.get<ApiResponse<PtImportLineDto[]>>(`/header/${headerId}`);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<PtImportLineDto[]>(error);
    }
  }

  async getByStockCode(stockCode: string): Promise<ApiResponse<PtImportLineDto[]>> {
    try {
      const response = await api.get<ApiResponse<PtImportLineDto[]>>(`/stock/${stockCode}`);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<PtImportLineDto[]>(error);
    }
  }

  async create(createDto: CreatePtImportLineDto): Promise<ApiResponse<PtImportLineDto>> {
    try {
      const response = await api.post<ApiResponse<PtImportLineDto>>('', createDto);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<PtImportLineDto>(error);
    }
  }

  async update(id: number, updateDto: UpdatePtImportLineDto): Promise<ApiResponse<PtImportLineDto>> {
    try {
      const response = await api.put<ApiResponse<PtImportLineDto>>(`/${id}`, updateDto);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<PtImportLineDto>(error);
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
