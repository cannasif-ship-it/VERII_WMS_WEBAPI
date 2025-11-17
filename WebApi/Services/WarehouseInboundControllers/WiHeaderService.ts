import { CreateWiHeaderDto, UpdateWiHeaderDto, WiHeaderDto } from '../../Models/index';
import axios from 'axios';
import { ApiResponseErrorHelper } from '../../ApiResponseErrorHelper';
import { API_BASE_URL, DEFAULT_TIMEOUT, CURRENTLANGUAGE, getAuthToken } from '../../baseUrl';
import { ApiResponse, PagedResponse } from '../../Models/ApiResponse';
import { IWiHeaderService } from '../../Interfaces/index';

const api = axios.create({
  baseURL: API_BASE_URL + "/WiHeader",
  timeout: DEFAULT_TIMEOUT,
  headers: { 'Content-Type': 'application/json', Accept: 'application/json', 'X-Language': CURRENTLANGUAGE },
});

api.interceptors.request.use((config : any) => { const token = getAuthToken(); if (token) { config.headers.Authorization = `Bearer ${token}`; } return config; });

export class WiHeaderService implements IWiHeaderService {
  async getAll(): Promise<ApiResponse<WiHeaderDto[]>> {
    try {
      const response = await api.get<ApiResponse<WiHeaderDto[]>>('');
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<WiHeaderDto[]>(error);
    }
  }

  async getById(id: number): Promise<ApiResponse<WiHeaderDto>> {
    try {
      const response = await api.get<ApiResponse<WiHeaderDto>>(`/${id}`);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<WiHeaderDto>(error);
    }
  }

  async getPaged(pageNumber: number, pageSize: number, sortBy: string, sortDirection: string): Promise<ApiResponse<PagedResponse<WiHeaderDto>>> {
    try {
      const response = await api.get<ApiResponse<PagedResponse<WiHeaderDto>>>(`/paged`, { params: { pageNumber: pageNumber, pageSize: pageSize, sortBy: sortBy, sortDirection: sortDirection } });
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<PagedResponse<WiHeaderDto>>(error);
    }
  }

  async getByBranchCode(branchCode: string): Promise<ApiResponse<WiHeaderDto[]>> {
    try {
      const response = await api.get<ApiResponse<WiHeaderDto[]>>(`/branch/${branchCode}`);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<WiHeaderDto[]>(error);
    }
  }

  async getByDateRange(startDate: string, endDate: string): Promise<ApiResponse<WiHeaderDto[]>> {
    try {
      const response = await api.get<ApiResponse<WiHeaderDto[]>>(`/date-range`, { params: { startDate: startDate, endDate: endDate } });
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<WiHeaderDto[]>(error);
    }
  }

  async getByCustomerCode(customerCode: string): Promise<ApiResponse<WiHeaderDto[]>> {
    try {
      const response = await api.get<ApiResponse<WiHeaderDto[]>>(`/customer/${customerCode}`);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<WiHeaderDto[]>(error);
    }
  }

  async getByDocumentType(documentType: string): Promise<ApiResponse<WiHeaderDto[]>> {
    try {
      const response = await api.get<ApiResponse<WiHeaderDto[]>>(`/doctype/${documentType}`);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<WiHeaderDto[]>(error);
    }
  }

  async getByDocumentNo(documentNo: string): Promise<ApiResponse<WiHeaderDto[]>> {
    try {
      const response = await api.get<ApiResponse<WiHeaderDto[]>>(`/docno/${documentNo}`);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<WiHeaderDto[]>(error);
    }
  }

  async getByInboundType(inboundType: string): Promise<ApiResponse<WiHeaderDto[]>> {
    try {
      const response = await api.get<ApiResponse<WiHeaderDto[]>>(`/inbound/${inboundType}`);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<WiHeaderDto[]>(error);
    }
  }

  async getByAccountCode(accountCode: string): Promise<ApiResponse<WiHeaderDto[]>> {
    try {
      const response = await api.get<ApiResponse<WiHeaderDto[]>>(`/account/${accountCode}`);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<WiHeaderDto[]>(error);
    }
  }

  async create(createDto: CreateWiHeaderDto): Promise<ApiResponse<WiHeaderDto>> {
    try {
      const response = await api.post<ApiResponse<WiHeaderDto>>('', createDto);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<WiHeaderDto>(error);
    }
  }

  async update(id: number, updateDto: UpdateWiHeaderDto): Promise<ApiResponse<WiHeaderDto>> {
    try {
      const response = await api.put<ApiResponse<WiHeaderDto>>(`/${id}`, updateDto);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<WiHeaderDto>(error);
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
      const response = await api.post<ApiResponse<boolean>>(`/${id}/complete`, payload);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<boolean>(error);
    }
  }

}
