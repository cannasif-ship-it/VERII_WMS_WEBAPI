import type { CreateWiLineDto, UpdateWiLineDto, WiLineDto } from '../../Models/index';
import axios from 'axios';
import { ApiResponseErrorHelper } from '../../ApiResponseErrorHelper';
import { API_BASE_URL, DEFAULT_TIMEOUT, CURRENTLANGUAGE, getAuthToken } from '../../baseUrl';
import type { ApiResponse, PagedResponse } from '../../Models/ApiResponse';
import type { IWiLineService } from '../../Interfaces/index';

const api = axios.create({
  baseURL: API_BASE_URL + "/WiLine",
  timeout: DEFAULT_TIMEOUT,
  headers: { 'Content-Type': 'application/json', Accept: 'application/json', 'X-Language': CURRENTLANGUAGE },
});

api.interceptors.request.use((config : any) => { const token = getAuthToken(); if (token) { config.headers.Authorization = `Bearer ${token}`; } return config; });

export class WiLineService implements IWiLineService {
  async getAll(): Promise<ApiResponse<WiLineDto[]>> {
    try {
      const response = await api.get<ApiResponse<WiLineDto[]>>('');
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<WiLineDto[]>(error);
    }
  }

  async getById(id: number): Promise<ApiResponse<WiLineDto>> {
    try {
      const response = await api.get<ApiResponse<WiLineDto>>(`/${id}`);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<WiLineDto>(error);
    }
  }

  async getPaged(pageNumber: number, pageSize: number, sortBy: string, sortDirection: string): Promise<ApiResponse<PagedResponse<WiLineDto>>> {
    try {
      const response = await api.get<ApiResponse<PagedResponse<WiLineDto>>>(`/paged`, { params: { pageNumber: pageNumber, pageSize: pageSize, sortBy: sortBy, sortDirection: sortDirection } });
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<PagedResponse<WiLineDto>>(error);
    }
  }

  async getByHeaderId(headerId: number): Promise<ApiResponse<WiLineDto[]>> {
    try {
      const response = await api.get<ApiResponse<WiLineDto[]>>(`/header/${headerId}`);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<WiLineDto[]>(error);
    }
  }

  async getByStockCode(stockCode: string): Promise<ApiResponse<WiLineDto[]>> {
    try {
      const response = await api.get<ApiResponse<WiLineDto[]>>(`/stock/${stockCode}`);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<WiLineDto[]>(error);
    }
  }

  async getByErpOrderNo(erpOrderNo: string): Promise<ApiResponse<WiLineDto[]>> {
    try {
      const response = await api.get<ApiResponse<WiLineDto[]>>(`/erporder/${erpOrderNo}`);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<WiLineDto[]>(error);
    }
  }

  async getByQuantityRange(minQuantity: number, maxQuantity: number): Promise<ApiResponse<WiLineDto[]>> {
    try {
      const response = await api.get<ApiResponse<WiLineDto[]>>(`/quantity-range`, { params: { minQuantity: minQuantity, maxQuantity: maxQuantity } });
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<WiLineDto[]>(error);
    }
  }

  async create(createDto: CreateWiLineDto): Promise<ApiResponse<WiLineDto>> {
    try {
      const response = await api.post<ApiResponse<WiLineDto>>('', createDto);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<WiLineDto>(error);
    }
  }

  async update(id: number, updateDto: UpdateWiLineDto): Promise<ApiResponse<WiLineDto>> {
    try {
      const response = await api.put<ApiResponse<WiLineDto>>(`/${id}`, updateDto);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<WiLineDto>(error);
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
