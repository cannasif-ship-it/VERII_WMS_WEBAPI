import { BulkCreateGrRequestDto, CreateGrHeaderDto, GrHeaderDto, UpdateGrHeaderDto } from '../../Models/index';
import axios from 'axios';
import { ApiResponseErrorHelper } from '../../ApiResponseErrorHelper';
import { API_BASE_URL, DEFAULT_TIMEOUT, CURRENTLANGUAGE, getAuthToken } from '../../baseUrl';
import { ApiResponse, PagedResponse } from '../../Models/ApiResponse';
import { IGrHeaderService } from '../../Interfaces/index';

const api = axios.create({
  baseURL: API_BASE_URL + "/GrHeader",
  timeout: DEFAULT_TIMEOUT,
  headers: { 'Content-Type': 'application/json', Accept: 'application/json', 'X-Language': CURRENTLANGUAGE },
});

api.interceptors.request.use((config : any) => { const token = getAuthToken(); if (token) { config.headers.Authorization = `Bearer ${token}`; } return config; });

export class GrHeaderService implements IGrHeaderService {
  async getAll(): Promise<ApiResponse<GrHeaderDto[]>> {
    try {
      const response = await api.get<ApiResponse<GrHeaderDto[]>>('');
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<GrHeaderDto[]>(error);
    }
  }

  async getById(id: number): Promise<ApiResponse<GrHeaderDto>> {
    try {
      const response = await api.get<ApiResponse<GrHeaderDto>>(`/${id}`);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<GrHeaderDto>(error);
    }
  }

  async create(createDto: CreateGrHeaderDto): Promise<ApiResponse<GrHeaderDto>> {
    try {
      const response = await api.post<ApiResponse<GrHeaderDto>>('', createDto);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<GrHeaderDto>(error);
    }
  }

  async update(id: number, updateDto: UpdateGrHeaderDto): Promise<ApiResponse<GrHeaderDto>> {
    try {
      const response = await api.put<ApiResponse<GrHeaderDto>>(`/${id}`, updateDto);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<GrHeaderDto>(error);
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

  async softDelete(id: number): Promise<ApiResponse<boolean>> {
    try {
      const response = await api.delete<ApiResponse<boolean>>(`/${id}/soft`);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<boolean>(error);
    }
  }

  async complete(id: number): Promise<ApiResponse<boolean>> {
    try {
      const response = await api.post<ApiResponse<boolean>>(`/complete/${id}`, payload);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<boolean>(error);
    }
  }

  async getByBranchCode(branchCode: string): Promise<ApiResponse<GrHeaderDto[]>> {
    try {
      const response = await api.get<ApiResponse<GrHeaderDto[]>>(`/by-branch/${branchCode}`);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<GrHeaderDto[]>(error);
    }
  }

  async getByCustomerCode(customerCode: string): Promise<ApiResponse<GrHeaderDto[]>> {
    try {
      const response = await api.get<ApiResponse<GrHeaderDto[]>>(`/by-customer/${customerCode}`);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<GrHeaderDto[]>(error);
    }
  }

  async getByDateRange(startDate: string, endDate: string): Promise<ApiResponse<GrHeaderDto[]>> {
    try {
      const response = await api.get<ApiResponse<GrHeaderDto[]>>(`/by-date-range`, { params: { startDate: startDate, endDate: endDate } });
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<GrHeaderDto[]>(error);
    }
  }

  async getPaged(pageNumber: number, pageSize: number, sortBy: string, sortDirection: string): Promise<ApiResponse<PagedResponse<GrHeaderDto>>> {
    try {
      const response = await api.get<ApiResponse<PagedResponse<GrHeaderDto>>>(`/paged`, { params: { pageNumber: pageNumber, pageSize: pageSize, sortBy: sortBy, sortDirection: sortDirection } });
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<PagedResponse<GrHeaderDto>>(error);
    }
  }

  async bulkCreateCorrelated(request: BulkCreateGrRequestDto): Promise<ApiResponse<number>> {
    try {
      const response = await api.post<ApiResponse<number>>(`/bulkCreate`, request);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<number>(error);
    }
  }

}
