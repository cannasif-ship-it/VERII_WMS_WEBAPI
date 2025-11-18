import type { CreateWoHeaderDto, UpdateWoHeaderDto, WoHeaderDto } from '../../Models/index';
import axios from 'axios';
import { ApiResponseErrorHelper } from '../../ApiResponseErrorHelper';
import { API_BASE_URL, DEFAULT_TIMEOUT, CURRENTLANGUAGE, getAuthToken } from '../../baseUrl';
import type { ApiResponse, PagedResponse } from '../../Models/ApiResponse';
import type { IWoHeaderService } from '../../Interfaces/index';

const api = axios.create({
  baseURL: API_BASE_URL + "/WoHeader",
  timeout: DEFAULT_TIMEOUT,
  headers: { 'Content-Type': 'application/json', Accept: 'application/json', 'X-Language': CURRENTLANGUAGE },
});

api.interceptors.request.use((config : any) => { const token = getAuthToken(); if (token) { config.headers.Authorization = `Bearer ${token}`; } return config; });

export class WoHeaderService implements IWoHeaderService {
  async complete(id: number): Promise<ApiResponse<boolean>> {
    try {
      const response = await api.post<ApiResponse<boolean>>(`/complete/${id}`);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<boolean>(error);
    }
  }

  async getAll(): Promise<ApiResponse<WoHeaderDto[]>> {
    try {
      const response = await api.get<ApiResponse<WoHeaderDto[]>>('');
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<WoHeaderDto[]>(error);
    }
  }

  async getById(id: number): Promise<ApiResponse<WoHeaderDto>> {
    try {
      const response = await api.get<ApiResponse<WoHeaderDto>>(`/${id}`);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<WoHeaderDto>(error);
    }
  }

  async getPaged(pageNumber: number, pageSize: number, sortBy: string, sortDirection: string): Promise<ApiResponse<PagedResponse<WoHeaderDto>>> {
    try {
      const response = await api.get<ApiResponse<PagedResponse<WoHeaderDto>>>(`/paged`, { params: { pageNumber: pageNumber, pageSize: pageSize, sortBy: sortBy, sortDirection: sortDirection } });
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<PagedResponse<WoHeaderDto>>(error);
    }
  }

  async getByBranchCode(branchCode: string): Promise<ApiResponse<WoHeaderDto[]>> {
    try {
      const response = await api.get<ApiResponse<WoHeaderDto[]>>(`/branch/${branchCode}`);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<WoHeaderDto[]>(error);
    }
  }

  async getByDateRange(startDate: Date, endDate: Date): Promise<ApiResponse<WoHeaderDto[]>> {
    try {
      const response = await api.get<ApiResponse<WoHeaderDto[]>>(`/date-range`, { params: { startDate: startDate, endDate: endDate } });
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<WoHeaderDto[]>(error);
    }
  }

  async getByCustomerCode(customerCode: string): Promise<ApiResponse<WoHeaderDto[]>> {
    try {
      const response = await api.get<ApiResponse<WoHeaderDto[]>>(`/customer/${customerCode}`);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<WoHeaderDto[]>(error);
    }
  }

  async getByDocumentType(documentType: string): Promise<ApiResponse<WoHeaderDto[]>> {
    try {
      const response = await api.get<ApiResponse<WoHeaderDto[]>>(`/doctype/${documentType}`);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<WoHeaderDto[]>(error);
    }
  }

  async getByDocumentNo(documentNo: string): Promise<ApiResponse<WoHeaderDto[]>> {
    try {
      const response = await api.get<ApiResponse<WoHeaderDto[]>>(`/docno/${documentNo}`);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<WoHeaderDto[]>(error);
    }
  }

  async getByOutboundType(outboundType: string): Promise<ApiResponse<WoHeaderDto[]>> {
    try {
      const response = await api.get<ApiResponse<WoHeaderDto[]>>(`/outbound/${outboundType}`);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<WoHeaderDto[]>(error);
    }
  }

  async getByAccountCode(accountCode: string): Promise<ApiResponse<WoHeaderDto[]>> {
    try {
      const response = await api.get<ApiResponse<WoHeaderDto[]>>(`/account/${accountCode}`);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<WoHeaderDto[]>(error);
    }
  }

  async create(createDto: CreateWoHeaderDto): Promise<ApiResponse<WoHeaderDto>> {
    try {
      const response = await api.post<ApiResponse<WoHeaderDto>>('', createDto);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<WoHeaderDto>(error);
    }
  }

  async update(id: number, updateDto: UpdateWoHeaderDto): Promise<ApiResponse<WoHeaderDto>> {
    try {
      const response = await api.put<ApiResponse<WoHeaderDto>>(`/${id}`, updateDto);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<WoHeaderDto>(error);
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
