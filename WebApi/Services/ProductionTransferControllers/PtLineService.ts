import { CreatePtLineDto, PtLineDto, UpdatePtLineDto } from '../../Models/index';
import axios from 'axios';
import { ApiResponseErrorHelper } from '../../ApiResponseErrorHelper';
import { API_BASE_URL, DEFAULT_TIMEOUT, CURRENTLANGUAGE, getAuthToken } from '../../baseUrl';
import { ApiResponse, PagedResponse } from '../../Models/ApiResponse';
import { IPtLineService } from '../../Interfaces/index';

const api = axios.create({
  baseURL: API_BASE_URL + "/PtLine",
  timeout: DEFAULT_TIMEOUT,
  headers: { 'Content-Type': 'application/json', Accept: 'application/json', 'X-Language': CURRENTLANGUAGE },
});

api.interceptors.request.use((config : any) => { const token = getAuthToken(); if (token) { config.headers.Authorization = `Bearer ${token}`; } return config; });

export class PtLineService implements IPtLineService {
  async getAll(): Promise<ApiResponse<PtLineDto[]>> {
    try {
      const response = await api.get<ApiResponse<PtLineDto[]>>('');
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<PtLineDto[]>(error);
    }
  }

  async getPaged(pageNumber: number, pageSize: number, sortBy: string, sortDirection: string): Promise<ApiResponse<PagedResponse<PtLineDto>>> {
    try {
      const response = await api.get<ApiResponse<PagedResponse<PtLineDto>>>(`/paged`, { params: { pageNumber: pageNumber, pageSize: pageSize, sortBy: sortBy, sortDirection: sortDirection } });
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<PagedResponse<PtLineDto>>(error);
    }
  }

  async getById(id: number): Promise<ApiResponse<PtLineDto>> {
    try {
      const response = await api.get<ApiResponse<PtLineDto>>(`/${id}`);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<PtLineDto>(error);
    }
  }

  async getByHeaderId(headerId: number): Promise<ApiResponse<PtLineDto[]>> {
    try {
      const response = await api.get<ApiResponse<PtLineDto[]>>(`/header/${headerId}`);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<PtLineDto[]>(error);
    }
  }

  async getByStockCode(stockCode: string): Promise<ApiResponse<PtLineDto[]>> {
    try {
      const response = await api.get<ApiResponse<PtLineDto[]>>(`/stock/${stockCode}`);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<PtLineDto[]>(error);
    }
  }

  async getByErpOrderNo(erpOrderNo: string): Promise<ApiResponse<PtLineDto[]>> {
    try {
      const response = await api.get<ApiResponse<PtLineDto[]>>(`/erpOrder/${erpOrderNo}`);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<PtLineDto[]>(error);
    }
  }

  async getByQuantityRange(minQuantity: number, maxQuantity: number): Promise<ApiResponse<PtLineDto[]>> {
    try {
      const response = await api.get<ApiResponse<PtLineDto[]>>(`/quantity-range`, { params: { minQuantity: minQuantity, maxQuantity: maxQuantity } });
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<PtLineDto[]>(error);
    }
  }

  async create(createDto: CreatePtLineDto): Promise<ApiResponse<PtLineDto>> {
    try {
      const response = await api.post<ApiResponse<PtLineDto>>('', createDto);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<PtLineDto>(error);
    }
  }

  async update(id: number, updateDto: UpdatePtLineDto): Promise<ApiResponse<PtLineDto>> {
    try {
      const response = await api.put<ApiResponse<PtLineDto>>(`/${id}`, updateDto);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<PtLineDto>(error);
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
