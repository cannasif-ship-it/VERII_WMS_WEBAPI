import type { CreateWtLineDto, UpdateWtLineDto, WtLineDto } from '../../Models/index';
import axios from 'axios';
import { ApiResponseErrorHelper } from '../../ApiResponseErrorHelper';
import { API_BASE_URL, DEFAULT_TIMEOUT, CURRENTLANGUAGE, getAuthToken } from '../../baseUrl';
import type { ApiResponse, PagedResponse } from '../../Models/ApiResponse';
import type { IWtLineService } from '../../Interfaces/index';

const api = axios.create({
  baseURL: API_BASE_URL + "/WtLine",
  timeout: DEFAULT_TIMEOUT,
  headers: { 'Content-Type': 'application/json', Accept: 'application/json', 'X-Language': CURRENTLANGUAGE },
});

api.interceptors.request.use((config : any) => { const token = getAuthToken(); if (token) { config.headers.Authorization = `Bearer ${token}`; } return config; });

export class WtLineService implements IWtLineService {
  async getAll(): Promise<ApiResponse<WtLineDto[]>> {
    try {
      const response = await api.get<ApiResponse<WtLineDto[]>>('');
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<WtLineDto[]>(error);
    }
  }

  async getById(id: number): Promise<ApiResponse<WtLineDto>> {
    try {
      const response = await api.get<ApiResponse<WtLineDto>>(`/${id}`);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<WtLineDto>(error);
    }
  }

  async getByHeaderId(headerId: number): Promise<ApiResponse<WtLineDto[]>> {
    try {
      const response = await api.get<ApiResponse<WtLineDto[]>>(`/header/${headerId}`);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<WtLineDto[]>(error);
    }
  }

  async getByStockCode(stockCode: string): Promise<ApiResponse<WtLineDto[]>> {
    try {
      const response = await api.get<ApiResponse<WtLineDto[]>>(`/stock/${stockCode}`);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<WtLineDto[]>(error);
    }
  }

  async getByErpOrderNo(erpOrderNo: string): Promise<ApiResponse<WtLineDto[]>> {
    try {
      const response = await api.get<ApiResponse<WtLineDto[]>>(`/erporder/${erpOrderNo}`);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<WtLineDto[]>(error);
    }
  }

  async create(createDto: CreateWtLineDto): Promise<ApiResponse<WtLineDto>> {
    try {
      const response = await api.post<ApiResponse<WtLineDto>>('', createDto);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<WtLineDto>(error);
    }
  }

  async update(id: number, updateDto: UpdateWtLineDto): Promise<ApiResponse<WtLineDto>> {
    try {
      const response = await api.put<ApiResponse<WtLineDto>>(`/${id}`, updateDto);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<WtLineDto>(error);
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

  async getByQuantityRange(minQuantity: number, maxQuantity: number): Promise<ApiResponse<WtLineDto[]>> {
    try {
      const response = await api.get<ApiResponse<WtLineDto[]>>(`/quantity`, { params: { minQuantity: minQuantity, maxQuantity: maxQuantity } });
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<WtLineDto[]>(error);
    }
  }

  async getPaged(pageNumber: number, pageSize: number, sortBy: string, sortDirection: string): Promise<ApiResponse<PagedResponse<WtLineDto>>> {
    try {
      const response = await api.get<ApiResponse<PagedResponse<WtLineDto>>>(`/paged`, { params: { pageNumber: pageNumber, pageSize: pageSize, sortBy: sortBy, sortDirection: sortDirection } });
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<PagedResponse<WtLineDto>>(error);
    }
  }

}
