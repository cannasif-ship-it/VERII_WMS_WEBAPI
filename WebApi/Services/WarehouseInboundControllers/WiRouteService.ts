import type { CreateWiRouteDto, UpdateWiRouteDto, WiRouteDto } from '../../Models/index';
import axios from 'axios';
import { ApiResponseErrorHelper } from '../../ApiResponseErrorHelper';
import { API_BASE_URL, DEFAULT_TIMEOUT, CURRENTLANGUAGE, getAuthToken } from '../../baseUrl';
import type { ApiResponse, PagedResponse } from '../../ApiResponse';
import type { IWiRouteService } from '../../Interfaces/index';

const api = axios.create({
  baseURL: API_BASE_URL + "/WiRoute",
  timeout: DEFAULT_TIMEOUT,
  headers: { 'Content-Type': 'application/json', Accept: 'application/json', 'X-Language': CURRENTLANGUAGE },
});

api.interceptors.request.use((config : any) => { const token = getAuthToken(); if (token) { config.headers.Authorization = `Bearer ${token}`; } return config; });

export class WiRouteService implements IWiRouteService {
  async getAll(): Promise<ApiResponse<WiRouteDto[]>> {
    try {
      const response = await api.get<ApiResponse<WiRouteDto[]>>('');
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<WiRouteDto[]>(error);
    }
  }

  async getById(id: number): Promise<ApiResponse<WiRouteDto>> {
    try {
      const response = await api.get<ApiResponse<WiRouteDto>>(`/${id}`);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<WiRouteDto>(error);
    }
  }

  async getByLineId(lineId: number): Promise<ApiResponse<WiRouteDto[]>> {
    try {
      const response = await api.get<ApiResponse<WiRouteDto[]>>(`/line/${lineId}`);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<WiRouteDto[]>(error);
    }
  }

  async getByStockCode(stockCode: string): Promise<ApiResponse<WiRouteDto[]>> {
    try {
      const response = await api.get<ApiResponse<WiRouteDto[]>>(`/stock/${stockCode}`);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<WiRouteDto[]>(error);
    }
  }

  async getBySerialNo(serialNo: string): Promise<ApiResponse<WiRouteDto[]>> {
    try {
      const response = await api.get<ApiResponse<WiRouteDto[]>>(`/serial/${serialNo}`);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<WiRouteDto[]>(error);
    }
  }

  async getBySourceWarehouse(sourceWarehouse: number): Promise<ApiResponse<WiRouteDto[]>> {
    try {
      const response = await api.get<ApiResponse<WiRouteDto[]>>(`/source/${sourceWarehouse}`);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<WiRouteDto[]>(error);
    }
  }

  async getByTargetWarehouse(targetWarehouse: number): Promise<ApiResponse<WiRouteDto[]>> {
    try {
      const response = await api.get<ApiResponse<WiRouteDto[]>>(`/target/${targetWarehouse}`);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<WiRouteDto[]>(error);
    }
  }

  async getByQuantityRange(minQuantity: number, maxQuantity: number): Promise<ApiResponse<WiRouteDto[]>> {
    try {
      const response = await api.get<ApiResponse<WiRouteDto[]>>(`/quantity-range`, { params: { minQuantity: minQuantity, maxQuantity: maxQuantity } });
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<WiRouteDto[]>(error);
    }
  }

  async create(createDto: CreateWiRouteDto): Promise<ApiResponse<WiRouteDto>> {
    try {
      const response = await api.post<ApiResponse<WiRouteDto>>('', createDto);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<WiRouteDto>(error);
    }
  }

  async update(id: number, updateDto: UpdateWiRouteDto): Promise<ApiResponse<WiRouteDto>> {
    try {
      const response = await api.put<ApiResponse<WiRouteDto>>(`/${id}`, updateDto);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<WiRouteDto>(error);
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
