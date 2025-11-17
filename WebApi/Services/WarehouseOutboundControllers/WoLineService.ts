import { CreateWoLineDto, UpdateWoLineDto, WoLineDto } from '../../Models/index';
import axios from 'axios';
import { ApiResponseErrorHelper } from '../../ApiResponseErrorHelper';
import { API_BASE_URL, DEFAULT_TIMEOUT, CURRENTLANGUAGE, getAuthToken } from '../../baseUrl';
import { ApiResponse, PagedResponse } from '../../Models/ApiResponse';
import { IWoLineService } from '../../Interfaces/index';

const api = axios.create({
  baseURL: API_BASE_URL + "/WoLine",
  timeout: DEFAULT_TIMEOUT,
  headers: { 'Content-Type': 'application/json', Accept: 'application/json', 'X-Language': CURRENTLANGUAGE },
});

api.interceptors.request.use((config : any) => { const token = getAuthToken(); if (token) { config.headers.Authorization = `Bearer ${token}`; } return config; });

export class WoLineService implements IWoLineService {
  async getAll(): Promise<ApiResponse<WoLineDto[]>> {
    try {
      const response = await api.get<ApiResponse<WoLineDto[]>>('');
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<WoLineDto[]>(error);
    }
  }

  async getById(id: number): Promise<ApiResponse<WoLineDto>> {
    try {
      const response = await api.get<ApiResponse<WoLineDto>>(`/${id}`);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<WoLineDto>(error);
    }
  }

  async getPaged(pageNumber: number, pageSize: number, sortBy: string, sortDirection: string): Promise<ApiResponse<PagedResponse<WoLineDto>>> {
    try {
      const response = await api.get<ApiResponse<PagedResponse<WoLineDto>>>(`/paged`, { params: { pageNumber: pageNumber, pageSize: pageSize, sortBy: sortBy, sortDirection: sortDirection } });
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<PagedResponse<WoLineDto>>(error);
    }
  }

  async getByHeaderId(headerId: number): Promise<ApiResponse<WoLineDto[]>> {
    try {
      const response = await api.get<ApiResponse<WoLineDto[]>>(`/header/${headerId}`);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<WoLineDto[]>(error);
    }
  }

  async getByStockCode(stockCode: string): Promise<ApiResponse<WoLineDto[]>> {
    try {
      const response = await api.get<ApiResponse<WoLineDto[]>>(`/stock/${stockCode}`);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<WoLineDto[]>(error);
    }
  }

  async getByErpOrderNo(erpOrderNo: string): Promise<ApiResponse<WoLineDto[]>> {
    try {
      const response = await api.get<ApiResponse<WoLineDto[]>>(`/erporder/${erpOrderNo}`);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<WoLineDto[]>(error);
    }
  }

  async getByQuantityRange(minQuantity: number, maxQuantity: number): Promise<ApiResponse<WoLineDto[]>> {
    try {
      const response = await api.get<ApiResponse<WoLineDto[]>>(`/quantity-range`, { params: { minQuantity: minQuantity, maxQuantity: maxQuantity } });
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<WoLineDto[]>(error);
    }
  }

  async create(createDto: CreateWoLineDto): Promise<ApiResponse<WoLineDto>> {
    try {
      const response = await api.post<ApiResponse<WoLineDto>>('', createDto);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<WoLineDto>(error);
    }
  }

  async update(id: number, updateDto: UpdateWoLineDto): Promise<ApiResponse<WoLineDto>> {
    try {
      const response = await api.put<ApiResponse<WoLineDto>>(`/${id}`, updateDto);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<WoLineDto>(error);
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
