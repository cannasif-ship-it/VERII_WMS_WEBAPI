import { CreateSrtLineDto, SrtLineDto, UpdateSrtLineDto } from '../../Models/index';
import axios from 'axios';
import { ApiResponseErrorHelper } from '../../ApiResponseErrorHelper';
import { API_BASE_URL, DEFAULT_TIMEOUT, CURRENTLANGUAGE, getAuthToken } from '../../baseUrl';
import { ApiResponse, PagedResponse } from '../../Models/ApiResponse';
import { ISrtLineService } from '../../Interfaces/index';

const api = axios.create({
  baseURL: API_BASE_URL + "/SrtLine",
  timeout: DEFAULT_TIMEOUT,
  headers: { 'Content-Type': 'application/json', Accept: 'application/json', 'X-Language': CURRENTLANGUAGE },
});

api.interceptors.request.use((config : any) => { const token = getAuthToken(); if (token) { config.headers.Authorization = `Bearer ${token}`; } return config; });

export class SrtLineService implements ISrtLineService {
  async getAll(): Promise<ApiResponse<SrtLineDto[]>> {
    try {
      const response = await api.get<ApiResponse<SrtLineDto[]>>('');
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<SrtLineDto[]>(error);
    }
  }

  async getPaged(pageNumber: number, pageSize: number, sortBy: string, sortDirection: string): Promise<ApiResponse<PagedResponse<SrtLineDto>>> {
    try {
      const response = await api.get<ApiResponse<PagedResponse<SrtLineDto>>>(`/paged`, { params: { pageNumber: pageNumber, pageSize: pageSize, sortBy: sortBy, sortDirection: sortDirection } });
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<PagedResponse<SrtLineDto>>(error);
    }
  }

  async getById(id: number): Promise<ApiResponse<SrtLineDto>> {
    try {
      const response = await api.get<ApiResponse<SrtLineDto>>(`/${id}`);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<SrtLineDto>(error);
    }
  }

  async getByHeaderId(headerId: number): Promise<ApiResponse<SrtLineDto[]>> {
    try {
      const response = await api.get<ApiResponse<SrtLineDto[]>>(`/header/${headerId}`);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<SrtLineDto[]>(error);
    }
  }

  async getByStockCode(stockCode: string): Promise<ApiResponse<SrtLineDto[]>> {
    try {
      const response = await api.get<ApiResponse<SrtLineDto[]>>(`/stock/${stockCode}`);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<SrtLineDto[]>(error);
    }
  }

  async getByErpOrderNo(erpOrderNo: string): Promise<ApiResponse<SrtLineDto[]>> {
    try {
      const response = await api.get<ApiResponse<SrtLineDto[]>>(`/erpOrder/${erpOrderNo}`);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<SrtLineDto[]>(error);
    }
  }

  async getByQuantityRange(minQuantity: number, maxQuantity: number): Promise<ApiResponse<SrtLineDto[]>> {
    try {
      const response = await api.get<ApiResponse<SrtLineDto[]>>(`/quantity-range`, { params: { minQuantity: minQuantity, maxQuantity: maxQuantity } });
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<SrtLineDto[]>(error);
    }
  }

  async create(createDto: CreateSrtLineDto): Promise<ApiResponse<SrtLineDto>> {
    try {
      const response = await api.post<ApiResponse<SrtLineDto>>('', createDto);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<SrtLineDto>(error);
    }
  }

  async update(id: number, updateDto: UpdateSrtLineDto): Promise<ApiResponse<SrtLineDto>> {
    try {
      const response = await api.put<ApiResponse<SrtLineDto>>(`/${id}`, updateDto);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<SrtLineDto>(error);
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
