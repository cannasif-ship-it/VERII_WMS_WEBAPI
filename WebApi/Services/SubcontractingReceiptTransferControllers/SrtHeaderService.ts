import { CreateSrtHeaderDto, SrtHeaderDto, UpdateSrtHeaderDto } from '../../Models/index';
import axios from 'axios';
import { ApiResponseErrorHelper } from '../../ApiResponseErrorHelper';
import { API_BASE_URL, DEFAULT_TIMEOUT, CURRENTLANGUAGE, getAuthToken } from '../../baseUrl';
import { ApiResponse, PagedResponse } from '../../Models/ApiResponse';
import { ISrtHeaderService } from '../../Interfaces/index';

const api = axios.create({
  baseURL: API_BASE_URL + "/SrtHeader",
  timeout: DEFAULT_TIMEOUT,
  headers: { 'Content-Type': 'application/json', Accept: 'application/json', 'X-Language': CURRENTLANGUAGE },
});

api.interceptors.request.use((config : any) => { const token = getAuthToken(); if (token) { config.headers.Authorization = `Bearer ${token}`; } return config; });

export class SrtHeaderService implements ISrtHeaderService {
  async getAll(): Promise<ApiResponse<SrtHeaderDto[]>> {
    try {
      const response = await api.get<ApiResponse<SrtHeaderDto[]>>('');
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<SrtHeaderDto[]>(error);
    }
  }

  async getPaged(pageNumber: number, pageSize: number, sortBy: string, sortDirection: string): Promise<ApiResponse<PagedResponse<SrtHeaderDto>>> {
    try {
      const response = await api.get<ApiResponse<PagedResponse<SrtHeaderDto>>>(`/paged`, { params: { pageNumber: pageNumber, pageSize: pageSize, sortBy: sortBy, sortDirection: sortDirection } });
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<PagedResponse<SrtHeaderDto>>(error);
    }
  }

  async getById(id: number): Promise<ApiResponse<SrtHeaderDto>> {
    try {
      const response = await api.get<ApiResponse<SrtHeaderDto>>(`/${id}`);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<SrtHeaderDto>(error);
    }
  }

  async getByBranchCode(branchCode: string): Promise<ApiResponse<SrtHeaderDto[]>> {
    try {
      const response = await api.get<ApiResponse<SrtHeaderDto[]>>(`/branch/${branchCode}`);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<SrtHeaderDto[]>(error);
    }
  }

  async getByDateRange(startDate: string, endDate: string): Promise<ApiResponse<SrtHeaderDto[]>> {
    try {
      const response = await api.get<ApiResponse<SrtHeaderDto[]>>(`/date-range`, { params: { startDate: startDate, endDate: endDate } });
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<SrtHeaderDto[]>(error);
    }
  }

  async getByCustomerCode(customerCode: string): Promise<ApiResponse<SrtHeaderDto[]>> {
    try {
      const response = await api.get<ApiResponse<SrtHeaderDto[]>>(`/customer/${customerCode}`);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<SrtHeaderDto[]>(error);
    }
  }

  async getByDocumentType(documentType: string): Promise<ApiResponse<SrtHeaderDto[]>> {
    try {
      const response = await api.get<ApiResponse<SrtHeaderDto[]>>(`/doctype/${documentType}`);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<SrtHeaderDto[]>(error);
    }
  }

  async getByDocumentNo(documentNo: string): Promise<ApiResponse<SrtHeaderDto[]>> {
    try {
      const response = await api.get<ApiResponse<SrtHeaderDto[]>>(`/docno/${documentNo}`);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<SrtHeaderDto[]>(error);
    }
  }

  async create(createDto: CreateSrtHeaderDto): Promise<ApiResponse<SrtHeaderDto>> {
    try {
      const response = await api.post<ApiResponse<SrtHeaderDto>>('', createDto);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<SrtHeaderDto>(error);
    }
  }

  async update(id: number, updateDto: UpdateSrtHeaderDto): Promise<ApiResponse<SrtHeaderDto>> {
    try {
      const response = await api.put<ApiResponse<SrtHeaderDto>>(`/${id}`, updateDto);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<SrtHeaderDto>(error);
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
      const response = await api.post<ApiResponse<boolean>>(`/${id}/complete`, payload);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<boolean>(error);
    }
  }

}
