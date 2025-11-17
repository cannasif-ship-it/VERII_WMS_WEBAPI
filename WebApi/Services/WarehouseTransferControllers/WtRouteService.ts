import { CreateWtRouteDto, UpdateWtRouteDto, WtRouteDto } from '../../Models/index';
import axios from 'axios';
import { ApiResponseErrorHelper } from '../../ApiResponseErrorHelper';
import { API_BASE_URL, DEFAULT_TIMEOUT, CURRENTLANGUAGE, getAuthToken } from '../../baseUrl';
import { ApiResponse, PagedResponse } from '../../Models/ApiResponse';
import { IWtRouteService } from '../../Interfaces/index';

const api = axios.create({
  baseURL: API_BASE_URL + "/WtRoute",
  timeout: DEFAULT_TIMEOUT,
  headers: { 'Content-Type': 'application/json', Accept: 'application/json', 'X-Language': CURRENTLANGUAGE },
});

api.interceptors.request.use((config : any) => { const token = getAuthToken(); if (token) { config.headers.Authorization = `Bearer ${token}`; } return config; });

export class WtRouteService implements IWtRouteService {
  async getAll(): Promise<ApiResponse<WtRouteDto[]>> {
    try {
      const response = await api.get<ApiResponse<WtRouteDto[]>>('');
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<WtRouteDto[]>(error);
    }
  }

  async getById(id: number): Promise<ApiResponse<WtRouteDto>> {
    try {
      const response = await api.get<ApiResponse<WtRouteDto>>(`/${id}`);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<WtRouteDto>(error);
    }
  }

  async getByLineId(lineId: number): Promise<ApiResponse<WtRouteDto[]>> {
    try {
      const response = await api.get<ApiResponse<WtRouteDto[]>>(`/line/${lineId}`);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<WtRouteDto[]>(error);
    }
  }

  async getByStockCode(stockCode: string): Promise<ApiResponse<WtRouteDto[]>> {
    try {
      const response = await api.get<ApiResponse<WtRouteDto[]>>(`/stock/${stockCode}`);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<WtRouteDto[]>(error);
    }
  }

  async getBySerialNo(serialNo: string): Promise<ApiResponse<WtRouteDto[]>> {
    try {
      const response = await api.get<ApiResponse<WtRouteDto[]>>(`/serial/${serialNo}`);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<WtRouteDto[]>(error);
    }
  }

  async getBySourceWarehouse(sourceWarehouse: string): Promise<ApiResponse<WtRouteDto[]>> {
    try {
      const response = await api.get<ApiResponse<WtRouteDto[]>>(`/sourcewarehouse/${sourceWarehouse}`);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<WtRouteDto[]>(error);
    }
  }

  async getByTargetWarehouse(targetWarehouse: string): Promise<ApiResponse<WtRouteDto[]>> {
    try {
      const response = await api.get<ApiResponse<WtRouteDto[]>>(`/targetwarehouse/${targetWarehouse}`);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<WtRouteDto[]>(error);
    }
  }

  async create(createDto: CreateWtRouteDto): Promise<ApiResponse<WtRouteDto>> {
    try {
      const response = await api.post<ApiResponse<WtRouteDto>>('', createDto);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<WtRouteDto>(error);
    }
  }

  async update(id: number, updateDto: UpdateWtRouteDto): Promise<ApiResponse<WtRouteDto>> {
    try {
      const response = await api.put<ApiResponse<WtRouteDto>>(`/${id}`, updateDto);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<WtRouteDto>(error);
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

  async getByQuantityRange(minQuantity: number, maxQuantity: number): Promise<ApiResponse<WtRouteDto[]>> {
    try {
      const response = await api.get<ApiResponse<WtRouteDto[]>>(`/quantity`, { params: { minQuantity: minQuantity, maxQuantity: maxQuantity } });
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<WtRouteDto[]>(error);
    }
  }

}
