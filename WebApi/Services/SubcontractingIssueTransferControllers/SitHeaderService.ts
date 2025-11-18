import type { CreateSitHeaderDto, SitHeaderDto, UpdateSitHeaderDto } from '../../Models/index';
import axios from 'axios';
import { ApiResponseErrorHelper } from '../../ApiResponseErrorHelper';
import { API_BASE_URL, DEFAULT_TIMEOUT, CURRENTLANGUAGE, getAuthToken } from '../../baseUrl';
import type { ApiResponse, PagedResponse } from '../../Models/ApiResponse';
import type { ISitHeaderService } from '../../Interfaces/index';

const api = axios.create({
  baseURL: API_BASE_URL + "/SitHeader",
  timeout: DEFAULT_TIMEOUT,
  headers: { 'Content-Type': 'application/json', Accept: 'application/json', 'X-Language': CURRENTLANGUAGE },
});

api.interceptors.request.use((config : any) => { const token = getAuthToken(); if (token) { config.headers.Authorization = `Bearer ${token}`; } return config; });

export class SitHeaderService implements ISitHeaderService {
  async getAll(): Promise<ApiResponse<SitHeaderDto[]>> {
    try {
      const response = await api.get<ApiResponse<SitHeaderDto[]>>('');
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<SitHeaderDto[]>(error);
    }
  }

  async getPaged(pageNumber: number, pageSize: number, sortBy: string, sortDirection: string): Promise<ApiResponse<PagedResponse<SitHeaderDto>>> {
    try {
      const response = await api.get<ApiResponse<PagedResponse<SitHeaderDto>>>(`/paged`, { params: { pageNumber: pageNumber, pageSize: pageSize, sortBy: sortBy, sortDirection: sortDirection } });
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<PagedResponse<SitHeaderDto>>(error);
    }
  }

  async getById(id: number): Promise<ApiResponse<SitHeaderDto>> {
    try {
      const response = await api.get<ApiResponse<SitHeaderDto>>(`/${id}`);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<SitHeaderDto>(error);
    }
  }

  async getByBranchCode(branchCode: string): Promise<ApiResponse<SitHeaderDto[]>> {
    try {
      const response = await api.get<ApiResponse<SitHeaderDto[]>>(`/branch/${branchCode}`);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<SitHeaderDto[]>(error);
    }
  }

  async getByDateRange(startDate: Date, endDate: Date): Promise<ApiResponse<SitHeaderDto[]>> {
    try {
      const response = await api.get<ApiResponse<SitHeaderDto[]>>(`/date-range`, { params: { startDate: startDate, endDate: endDate } });
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<SitHeaderDto[]>(error);
    }
  }

  async getByCustomerCode(customerCode: string): Promise<ApiResponse<SitHeaderDto[]>> {
    try {
      const response = await api.get<ApiResponse<SitHeaderDto[]>>(`/customer/${customerCode}`);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<SitHeaderDto[]>(error);
    }
  }

  async getByDocumentType(documentType: string): Promise<ApiResponse<SitHeaderDto[]>> {
    try {
      const response = await api.get<ApiResponse<SitHeaderDto[]>>(`/doctype/${documentType}`);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<SitHeaderDto[]>(error);
    }
  }

  async getByDocumentNo(documentNo: string): Promise<ApiResponse<SitHeaderDto[]>> {
    try {
      const response = await api.get<ApiResponse<SitHeaderDto[]>>(`/docno/${documentNo}`);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<SitHeaderDto[]>(error);
    }
  }

  async create(createDto: CreateSitHeaderDto): Promise<ApiResponse<SitHeaderDto>> {
    try {
      const response = await api.post<ApiResponse<SitHeaderDto>>('', createDto);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<SitHeaderDto>(error);
    }
  }

  async update(id: number, updateDto: UpdateSitHeaderDto): Promise<ApiResponse<SitHeaderDto>> {
    try {
      const response = await api.put<ApiResponse<SitHeaderDto>>(`/${id}`, updateDto);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<SitHeaderDto>(error);
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
