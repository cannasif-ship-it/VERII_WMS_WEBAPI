import { CreateSitLineDto, SitLineDto, UpdateSitLineDto } from '../../Models/index';
import axios from 'axios';
import { ApiResponseErrorHelper } from '../../ApiResponseErrorHelper';
import { API_BASE_URL, DEFAULT_TIMEOUT, CURRENTLANGUAGE, getAuthToken } from '../../baseUrl';
import { ApiResponse, PagedResponse } from '../../Models/ApiResponse';
import { ISitLineService } from '../../Interfaces/index';

const api = axios.create({
  baseURL: API_BASE_URL + "/SitLine",
  timeout: DEFAULT_TIMEOUT,
  headers: { 'Content-Type': 'application/json', Accept: 'application/json', 'X-Language': CURRENTLANGUAGE },
});

api.interceptors.request.use((config : any) => { const token = getAuthToken(); if (token) { config.headers.Authorization = `Bearer ${token}`; } return config; });

export class SitLineService implements ISitLineService {
  async getAll(): Promise<ApiResponse<SitLineDto[]>> {
    try {
      const response = await api.get<ApiResponse<SitLineDto[]>>('');
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<SitLineDto[]>(error);
    }
  }

  async getPaged(pageNumber: number, pageSize: number, sortBy: string, sortDirection: string): Promise<ApiResponse<PagedResponse<SitLineDto>>> {
    try {
      const response = await api.get<ApiResponse<PagedResponse<SitLineDto>>>(`/paged`, { params: { pageNumber: pageNumber, pageSize: pageSize, sortBy: sortBy, sortDirection: sortDirection } });
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<PagedResponse<SitLineDto>>(error);
    }
  }

  async getById(id: number): Promise<ApiResponse<SitLineDto>> {
    try {
      const response = await api.get<ApiResponse<SitLineDto>>(`/${id}`);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<SitLineDto>(error);
    }
  }

  async getByHeaderId(headerId: number): Promise<ApiResponse<SitLineDto[]>> {
    try {
      const response = await api.get<ApiResponse<SitLineDto[]>>(`/header/${headerId}`);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<SitLineDto[]>(error);
    }
  }

  async getByStockCode(stockCode: string): Promise<ApiResponse<SitLineDto[]>> {
    try {
      const response = await api.get<ApiResponse<SitLineDto[]>>(`/stock/${stockCode}`);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<SitLineDto[]>(error);
    }
  }

  async getByErpOrderNo(erpOrderNo: string): Promise<ApiResponse<SitLineDto[]>> {
    try {
      const response = await api.get<ApiResponse<SitLineDto[]>>(`/erpOrder/${erpOrderNo}`);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<SitLineDto[]>(error);
    }
  }

  async getByQuantityRange(minQuantity: number, maxQuantity: number): Promise<ApiResponse<SitLineDto[]>> {
    try {
      const response = await api.get<ApiResponse<SitLineDto[]>>(`/quantity-range`, { params: { minQuantity: minQuantity, maxQuantity: maxQuantity } });
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<SitLineDto[]>(error);
    }
  }

  async create(createDto: CreateSitLineDto): Promise<ApiResponse<SitLineDto>> {
    try {
      const response = await api.post<ApiResponse<SitLineDto>>('', createDto);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<SitLineDto>(error);
    }
  }

  async update(id: number, updateDto: UpdateSitLineDto): Promise<ApiResponse<SitLineDto>> {
    try {
      const response = await api.put<ApiResponse<SitLineDto>>(`/${id}`, updateDto);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<SitLineDto>(error);
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
