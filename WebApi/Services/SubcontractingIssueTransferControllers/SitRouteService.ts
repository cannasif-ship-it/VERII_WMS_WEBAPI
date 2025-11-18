import type { CreateSitRouteDto, SitRouteDto, UpdateSitRouteDto } from '../../Models/index';
import axios from 'axios';
import { ApiResponseErrorHelper } from '../../ApiResponseErrorHelper';
import { API_BASE_URL, DEFAULT_TIMEOUT, CURRENTLANGUAGE, getAuthToken } from '../../baseUrl';
import type { ApiResponse, PagedResponse } from '../../Models/ApiResponse';
import type { ISitRouteService } from '../../Interfaces/index';

const api = axios.create({
  baseURL: API_BASE_URL + "/SitRoute",
  timeout: DEFAULT_TIMEOUT,
  headers: { 'Content-Type': 'application/json', Accept: 'application/json', 'X-Language': CURRENTLANGUAGE },
});

api.interceptors.request.use((config : any) => { const token = getAuthToken(); if (token) { config.headers.Authorization = `Bearer ${token}`; } return config; });

export class SitRouteService implements ISitRouteService {
  async getAll(): Promise<ApiResponse<SitRouteDto[]>> {
    try {
      const response = await api.get<ApiResponse<SitRouteDto[]>>('');
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<SitRouteDto[]>(error);
    }
  }

  async getById(id: number): Promise<ApiResponse<SitRouteDto>> {
    try {
      const response = await api.get<ApiResponse<SitRouteDto>>(`/${id}`);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<SitRouteDto>(error);
    }
  }

  async getByLineId(lineId: number): Promise<ApiResponse<SitRouteDto[]>> {
    try {
      const response = await api.get<ApiResponse<SitRouteDto[]>>(`/line/${lineId}`);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<SitRouteDto[]>(error);
    }
  }

  async getByStockCode(stockCode: string): Promise<ApiResponse<SitRouteDto[]>> {
    try {
      const response = await api.get<ApiResponse<SitRouteDto[]>>(`/stock/${stockCode}`);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<SitRouteDto[]>(error);
    }
  }

  async getBySerialNo(serialNo: string): Promise<ApiResponse<SitRouteDto[]>> {
    try {
      const response = await api.get<ApiResponse<SitRouteDto[]>>(`/serial/${serialNo}`);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<SitRouteDto[]>(error);
    }
  }

  async getBySourceWarehouse(sourceWarehouse: number): Promise<ApiResponse<SitRouteDto[]>> {
    try {
      const response = await api.get<ApiResponse<SitRouteDto[]>>(`/source/${sourceWarehouse}`);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<SitRouteDto[]>(error);
    }
  }

  async getByTargetWarehouse(targetWarehouse: number): Promise<ApiResponse<SitRouteDto[]>> {
    try {
      const response = await api.get<ApiResponse<SitRouteDto[]>>(`/target/${targetWarehouse}`);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<SitRouteDto[]>(error);
    }
  }

  async getByQuantityRange(minQuantity: number, maxQuantity: number): Promise<ApiResponse<SitRouteDto[]>> {
    try {
      const response = await api.get<ApiResponse<SitRouteDto[]>>(`/quantity-range`, { params: { minQuantity: minQuantity, maxQuantity: maxQuantity } });
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<SitRouteDto[]>(error);
    }
  }

  async create(createDto: CreateSitRouteDto): Promise<ApiResponse<SitRouteDto>> {
    try {
      const response = await api.post<ApiResponse<SitRouteDto>>('', createDto);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<SitRouteDto>(error);
    }
  }

  async update(id: number, updateDto: UpdateSitRouteDto): Promise<ApiResponse<SitRouteDto>> {
    try {
      const response = await api.put<ApiResponse<SitRouteDto>>(`/${id}`, updateDto);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<SitRouteDto>(error);
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
