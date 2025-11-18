import type { BulkCreateWtRequestDto, CreateWtHeaderDto, GenerateWarehouseTransferOrderRequestDto, UpdateWtHeaderDto, WtHeaderDto } from '../../Models/index';
import axios from 'axios';
import { ApiResponseErrorHelper } from '../../ApiResponseErrorHelper';
import { API_BASE_URL, DEFAULT_TIMEOUT, CURRENTLANGUAGE, getAuthToken } from '../../baseUrl';
import type { ApiResponse, PagedResponse } from '../../ApiResponse';
import type { IWtHeaderService } from '../../Interfaces/index';

const api = axios.create({
  baseURL: API_BASE_URL + "/WtHeader",
  timeout: DEFAULT_TIMEOUT,
  headers: { 'Content-Type': 'application/json', Accept: 'application/json', 'X-Language': CURRENTLANGUAGE },
});

api.interceptors.request.use((config : any) => { const token = getAuthToken(); if (token) { config.headers.Authorization = `Bearer ${token}`; } return config; });

export class WtHeaderService implements IWtHeaderService {
  async getAll(): Promise<ApiResponse<WtHeaderDto[]>> {
    try {
      const response = await api.get<ApiResponse<WtHeaderDto[]>>('');
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<WtHeaderDto[]>(error);
    }
  }

  async getById(id: number): Promise<ApiResponse<WtHeaderDto>> {
    try {
      const response = await api.get<ApiResponse<WtHeaderDto>>(`/${id}`);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<WtHeaderDto>(error);
    }
  }

  async create(createDto: CreateWtHeaderDto): Promise<ApiResponse<WtHeaderDto>> {
    try {
      const response = await api.post<ApiResponse<WtHeaderDto>>('', createDto);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<WtHeaderDto>(error);
    }
  }

  async update(id: number, updateDto: UpdateWtHeaderDto): Promise<ApiResponse<WtHeaderDto>> {
    try {
      const response = await api.put<ApiResponse<WtHeaderDto>>(`/${id}`, updateDto);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<WtHeaderDto>(error);
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

  async bulkCreateInterWarehouseTransfer(request: BulkCreateWtRequestDto): Promise<ApiResponse<number>> {
    try {
      const response = await api.post<ApiResponse<number>>(`/inter-warehouse/bulk-create`, request);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<number>(error);
    }
  }

  async getByDocumentNo(documentNo: string): Promise<ApiResponse<WtHeaderDto[]>> {
    try {
      const response = await api.get<ApiResponse<WtHeaderDto[]>>(`/by-document/${documentNo}`);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<WtHeaderDto[]>(error);
    }
  }

  async getAssignedTransferOrders(userId: number): Promise<ApiResponse<WtHeaderDto[]>> {
    try {
      const response = await api.get<ApiResponse<WtHeaderDto[]>>(`/assigned/${userId}`);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<WtHeaderDto[]>(error);
    }
  }

  async getCompletedAwaitingErpApproval(): Promise<ApiResponse<WtHeaderDto[]>> {
    try {
      const response = await api.get<ApiResponse<WtHeaderDto[]>>(`/completed-awaiting-erp-approval`);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<WtHeaderDto[]>(error);
    }
  }

  async generateWarehouseTransferOrder(request: GenerateWarehouseTransferOrderRequestDto): Promise<ApiResponse<WtHeaderDto>> {
    try {
      const response = await api.post<ApiResponse<WtHeaderDto>>(`/generate`, request);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<WtHeaderDto>(error);
    }
  }

}
