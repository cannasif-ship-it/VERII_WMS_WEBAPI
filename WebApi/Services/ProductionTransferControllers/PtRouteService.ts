import type { CreatePtRouteDto, PtRouteDto, UpdatePtRouteDto } from '../../Models/index';
import axios from 'axios';
import { ApiResponseErrorHelper } from '../../ApiResponseErrorHelper';
import { API_BASE_URL, DEFAULT_TIMEOUT, CURRENTLANGUAGE, getAuthToken } from '../../baseUrl';
import type { ApiResponse, PagedResponse } from '../../ApiResponse';
import type { IPtRouteService } from '../../Interfaces/index';

const api = axios.create({
  baseURL: API_BASE_URL + "/PtRoute",
  timeout: DEFAULT_TIMEOUT,
  headers: { 'Content-Type': 'application/json', Accept: 'application/json', 'X-Language': CURRENTLANGUAGE },
});

api.interceptors.request.use((config : any) => { const token = getAuthToken(); if (token) { config.headers.Authorization = `Bearer ${token}`; } return config; });

export class PtRouteService implements IPtRouteService {
  async getAll(): Promise<ApiResponse<PtRouteDto[]>> {
    try {
      const response = await api.get<ApiResponse<PtRouteDto[]>>('');
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<PtRouteDto[]>(error);
    }
  }

  async getById(id: number): Promise<ApiResponse<PtRouteDto>> {
    try {
      const response = await api.get<ApiResponse<PtRouteDto>>(`/${id}`);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<PtRouteDto>(error);
    }
  }

  async getByImportLineId(importLineId: number): Promise<ApiResponse<PtRouteDto[]>> {
    try {
      const response = await api.get<ApiResponse<PtRouteDto[]>>(`/importline/${importLineId}`);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<PtRouteDto[]>(error);
    }
  }

  async getBySerialNo(serialNo: string): Promise<ApiResponse<PtRouteDto[]>> {
    try {
      const response = await api.get<ApiResponse<PtRouteDto[]>>(`/serial/${serialNo}`);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<PtRouteDto[]>(error);
    }
  }

  async getBySourceWarehouse(sourceWarehouse: number): Promise<ApiResponse<PtRouteDto[]>> {
    try {
      const response = await api.get<ApiResponse<PtRouteDto[]>>(`/source/${sourceWarehouse}`);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<PtRouteDto[]>(error);
    }
  }

  async getByTargetWarehouse(targetWarehouse: number): Promise<ApiResponse<PtRouteDto[]>> {
    try {
      const response = await api.get<ApiResponse<PtRouteDto[]>>(`/target/${targetWarehouse}`);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<PtRouteDto[]>(error);
    }
  }

  async getByQuantityRange(minQuantity: number, maxQuantity: number): Promise<ApiResponse<PtRouteDto[]>> {
    try {
      const response = await api.get<ApiResponse<PtRouteDto[]>>(`/quantity-range`, { params: { minQuantity: minQuantity, maxQuantity: maxQuantity } });
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<PtRouteDto[]>(error);
    }
  }

  async create(createDto: CreatePtRouteDto): Promise<ApiResponse<PtRouteDto>> {
    try {
      const response = await api.post<ApiResponse<PtRouteDto>>('', createDto);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<PtRouteDto>(error);
    }
  }

  async update(id: number, updateDto: UpdatePtRouteDto): Promise<ApiResponse<PtRouteDto>> {
    try {
      const response = await api.put<ApiResponse<PtRouteDto>>(`/${id}`, updateDto);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<PtRouteDto>(error);
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
