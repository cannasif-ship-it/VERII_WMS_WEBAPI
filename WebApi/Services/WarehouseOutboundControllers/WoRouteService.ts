import { CreateWoRouteDto, UpdateWoRouteDto, WoRouteDto } from '../../Models/index';
import axios from 'axios';
import { ApiResponseErrorHelper } from '../../ApiResponseErrorHelper';
import { API_BASE_URL, DEFAULT_TIMEOUT, CURRENTLANGUAGE, getAuthToken } from '../../baseUrl';
import { ApiResponse, PagedResponse } from '../../Models/ApiResponse';
import { IWoRouteService } from '../../Interfaces/index';

const api = axios.create({
  baseURL: API_BASE_URL + "/WoRoute",
  timeout: DEFAULT_TIMEOUT,
  headers: { 'Content-Type': 'application/json', Accept: 'application/json', 'X-Language': CURRENTLANGUAGE },
});

api.interceptors.request.use((config : any) => { const token = getAuthToken(); if (token) { config.headers.Authorization = `Bearer ${token}`; } return config; });

export class WoRouteService implements IWoRouteService {
  async getAll(): Promise<ApiResponse<WoRouteDto[]>> {
    try {
      const response = await api.get<ApiResponse<WoRouteDto[]>>('');
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<WoRouteDto[]>(error);
    }
  }

  async getById(id: number): Promise<ApiResponse<WoRouteDto>> {
    try {
      const response = await api.get<ApiResponse<WoRouteDto>>(`/${id}`);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<WoRouteDto>(error);
    }
  }

  async getByLineId(lineId: number): Promise<ApiResponse<WoRouteDto[]>> {
    try {
      const response = await api.get<ApiResponse<WoRouteDto[]>>(`/line/${lineId}`);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<WoRouteDto[]>(error);
    }
  }

  async getByStockCode(stockCode: string): Promise<ApiResponse<WoRouteDto[]>> {
    try {
      const response = await api.get<ApiResponse<WoRouteDto[]>>(`/stock/${stockCode}`);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<WoRouteDto[]>(error);
    }
  }

  async getBySerialNo(serialNo: string): Promise<ApiResponse<WoRouteDto[]>> {
    try {
      const response = await api.get<ApiResponse<WoRouteDto[]>>(`/serial/${serialNo}`);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<WoRouteDto[]>(error);
    }
  }

  async getBySourceWarehouse(sourceWarehouse: number): Promise<ApiResponse<WoRouteDto[]>> {
    try {
      const response = await api.get<ApiResponse<WoRouteDto[]>>(`/source/${sourceWarehouse}`);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<WoRouteDto[]>(error);
    }
  }

  async getByTargetWarehouse(targetWarehouse: number): Promise<ApiResponse<WoRouteDto[]>> {
    try {
      const response = await api.get<ApiResponse<WoRouteDto[]>>(`/target/${targetWarehouse}`);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<WoRouteDto[]>(error);
    }
  }

  async getByQuantityRange(minQuantity: number, maxQuantity: number): Promise<ApiResponse<WoRouteDto[]>> {
    try {
      const response = await api.get<ApiResponse<WoRouteDto[]>>(`/quantity-range`, { params: { minQuantity: minQuantity, maxQuantity: maxQuantity } });
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<WoRouteDto[]>(error);
    }
  }

  async create(createDto: CreateWoRouteDto): Promise<ApiResponse<WoRouteDto>> {
    try {
      const response = await api.post<ApiResponse<WoRouteDto>>('', createDto);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<WoRouteDto>(error);
    }
  }

  async update(id: number, updateDto: UpdateWoRouteDto): Promise<ApiResponse<WoRouteDto>> {
    try {
      const response = await api.put<ApiResponse<WoRouteDto>>(`/${id}`, updateDto);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<WoRouteDto>(error);
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
