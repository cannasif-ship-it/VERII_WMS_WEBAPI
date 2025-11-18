import type { CreatePtHeaderDto, PtHeaderDto, UpdatePtHeaderDto } from '../../Models/index';
import axios from 'axios';
import { ApiResponseErrorHelper } from '../../ApiResponseErrorHelper';
import { API_BASE_URL, DEFAULT_TIMEOUT, CURRENTLANGUAGE, getAuthToken } from '../../baseUrl';
import type { ApiResponse, PagedResponse } from '../../Models/ApiResponse';
import type { IPtHeaderService } from '../../Interfaces/index';

const api = axios.create({
  baseURL: API_BASE_URL + "/PtHeader",
  timeout: DEFAULT_TIMEOUT,
  headers: { 'Content-Type': 'application/json', Accept: 'application/json', 'X-Language': CURRENTLANGUAGE },
});

api.interceptors.request.use((config : any) => { const token = getAuthToken(); if (token) { config.headers.Authorization = `Bearer ${token}`; } return config; });

export class PtHeaderService implements IPtHeaderService {
  async getAll(): Promise<ApiResponse<PtHeaderDto[]>> {
    try {
      const response = await api.get<ApiResponse<PtHeaderDto[]>>('');
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<PtHeaderDto[]>(error);
    }
  }

  async getPaged(pageNumber: number, pageSize: number, sortBy: string, sortDirection: string): Promise<ApiResponse<PagedResponse<PtHeaderDto>>> {
    try {
      const response = await api.get<ApiResponse<PagedResponse<PtHeaderDto>>>(`/paged`, { params: { pageNumber: pageNumber, pageSize: pageSize, sortBy: sortBy, sortDirection: sortDirection } });
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<PagedResponse<PtHeaderDto>>(error);
    }
  }

  async getById(id: number): Promise<ApiResponse<PtHeaderDto>> {
    try {
      const response = await api.get<ApiResponse<PtHeaderDto>>(`/${id}`);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<PtHeaderDto>(error);
    }
  }

  async getByBranchCode(branchCode: string): Promise<ApiResponse<PtHeaderDto[]>> {
    try {
      const response = await api.get<ApiResponse<PtHeaderDto[]>>(`/branch/${branchCode}`);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<PtHeaderDto[]>(error);
    }
  }

  async getByDateRange(startDate: Date, endDate: Date): Promise<ApiResponse<PtHeaderDto[]>> {
    try {
      const response = await api.get<ApiResponse<PtHeaderDto[]>>(`/date-range`, { params: { startDate: startDate, endDate: endDate } });
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<PtHeaderDto[]>(error);
    }
  }

  async getByCustomerCode(customerCode: string): Promise<ApiResponse<PtHeaderDto[]>> {
    try {
      const response = await api.get<ApiResponse<PtHeaderDto[]>>(`/customer/${customerCode}`);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<PtHeaderDto[]>(error);
    }
  }

  async getByDocumentType(documentType: string): Promise<ApiResponse<PtHeaderDto[]>> {
    try {
      const response = await api.get<ApiResponse<PtHeaderDto[]>>(`/doctype/${documentType}`);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<PtHeaderDto[]>(error);
    }
  }

  async create(createDto: CreatePtHeaderDto): Promise<ApiResponse<PtHeaderDto>> {
    try {
      const response = await api.post<ApiResponse<PtHeaderDto>>('', createDto);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<PtHeaderDto>(error);
    }
  }

  async update(id: number, updateDto: UpdatePtHeaderDto): Promise<ApiResponse<PtHeaderDto>> {
    try {
      const response = await api.put<ApiResponse<PtHeaderDto>>(`/${id}`, updateDto);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<PtHeaderDto>(error);
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

  async complete(id: number): Promise<ApiResponse<boolean>> {
    try {
      const response = await api.post<ApiResponse<boolean>>(`/complete/${id}`);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<boolean>(error);
    }
  }

}
