import { CreateSrtRouteDto, SrtRouteDto, UpdateSrtRouteDto } from '../../Models/index';
import axios from 'axios';
import { ApiResponseErrorHelper } from '../../ApiResponseErrorHelper';
import { API_BASE_URL, DEFAULT_TIMEOUT, CURRENTLANGUAGE, getAuthToken } from '../../baseUrl';
import { ApiResponse, PagedResponse } from '../../Models/ApiResponse';
import { ISrtRouteService } from '../../Interfaces/index';

const api = axios.create({
  baseURL: API_BASE_URL + "/SrtRoute",
  timeout: DEFAULT_TIMEOUT,
  headers: { 'Content-Type': 'application/json', Accept: 'application/json', 'X-Language': CURRENTLANGUAGE },
});

api.interceptors.request.use((config : any) => { const token = getAuthToken(); if (token) { config.headers.Authorization = `Bearer ${token}`; } return config; });

export class SrtRouteService implements ISrtRouteService {
  async getAll(): Promise<ApiResponse<SrtRouteDto[]>> {
    try {
      const response = await api.get<ApiResponse<SrtRouteDto[]>>('');
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<SrtRouteDto[]>(error);
    }
  }

  async getById(id: number): Promise<ApiResponse<SrtRouteDto>> {
    try {
      const response = await api.get<ApiResponse<SrtRouteDto>>(`/${id}`);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<SrtRouteDto>(error);
    }
  }

  async getByLineId(lineId: number): Promise<ApiResponse<SrtRouteDto[]>> {
    try {
      const response = await api.get<ApiResponse<SrtRouteDto[]>>(`/line/${lineId}`);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<SrtRouteDto[]>(error);
    }
  }

  async getByStockCode(stockCode: string): Promise<ApiResponse<SrtRouteDto[]>> {
    try {
      const response = await api.get<ApiResponse<SrtRouteDto[]>>(`/stock/${stockCode}`);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<SrtRouteDto[]>(error);
    }
  }

  async getBySerialNo(serialNo: string): Promise<ApiResponse<SrtRouteDto[]>> {
    try {
      const response = await api.get<ApiResponse<SrtRouteDto[]>>(`/serial/${serialNo}`);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<SrtRouteDto[]>(error);
    }
  }

  async getBySourceWarehouse(sourceWarehouse: number): Promise<ApiResponse<SrtRouteDto[]>> {
    try {
      const response = await api.get<ApiResponse<SrtRouteDto[]>>(`/source/${sourceWarehouse}`);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<SrtRouteDto[]>(error);
    }
  }

  async getByTargetWarehouse(targetWarehouse: number): Promise<ApiResponse<SrtRouteDto[]>> {
    try {
      const response = await api.get<ApiResponse<SrtRouteDto[]>>(`/target/${targetWarehouse}`);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<SrtRouteDto[]>(error);
    }
  }

  async getByQuantityRange(minQuantity: number, maxQuantity: number): Promise<ApiResponse<SrtRouteDto[]>> {
    try {
      const response = await api.get<ApiResponse<SrtRouteDto[]>>(`/quantity-range`, { params: { minQuantity: minQuantity, maxQuantity: maxQuantity } });
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<SrtRouteDto[]>(error);
    }
  }

  async create(createDto: CreateSrtRouteDto): Promise<ApiResponse<SrtRouteDto>> {
    try {
      const response = await api.post<ApiResponse<SrtRouteDto>>('', createDto);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<SrtRouteDto>(error);
    }
  }

  async update(id: number, updateDto: UpdateSrtRouteDto): Promise<ApiResponse<SrtRouteDto>> {
    try {
      const response = await api.put<ApiResponse<SrtRouteDto>>(`/${id}`, updateDto);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<SrtRouteDto>(error);
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
