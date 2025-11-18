import type { AddWtImportBarcodeRequestDto, CreateWtImportLineDto, UpdateWtImportLineDto, WtImportLineDto } from '../../Models/index';
import axios from 'axios';
import { ApiResponseErrorHelper } from '../../ApiResponseErrorHelper';
import { API_BASE_URL, DEFAULT_TIMEOUT, CURRENTLANGUAGE, getAuthToken } from '../../baseUrl';
import type { ApiResponse, PagedResponse } from '../../ApiResponse';
import type { IWtImportLineService } from '../../Interfaces/index';

const api = axios.create({
  baseURL: API_BASE_URL + "/WtImportLine",
  timeout: DEFAULT_TIMEOUT,
  headers: { 'Content-Type': 'application/json', Accept: 'application/json', 'X-Language': CURRENTLANGUAGE },
});

api.interceptors.request.use((config : any) => { const token = getAuthToken(); if (token) { config.headers.Authorization = `Bearer ${token}`; } return config; });

export class WtImportLineService implements IWtImportLineService {
  async getAll(): Promise<ApiResponse<WtImportLineDto[]>> {
    try {
      const response = await api.get<ApiResponse<WtImportLineDto[]>>('');
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<WtImportLineDto[]>(error);
    }
  }

  async getById(id: number): Promise<ApiResponse<WtImportLineDto>> {
    try {
      const response = await api.get<ApiResponse<WtImportLineDto>>(`/${id}`);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<WtImportLineDto>(error);
    }
  }

  async getByLineId(lineId: number): Promise<ApiResponse<WtImportLineDto[]>> {
    try {
      const response = await api.get<ApiResponse<WtImportLineDto[]>>(`/line/${lineId}`);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<WtImportLineDto[]>(error);
    }
  }

  async getByHeaderId(headerId: number): Promise<ApiResponse<WtImportLineDto[]>> {
    try {
      const response = await api.get<ApiResponse<WtImportLineDto[]>>(`/header/${headerId}`);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<WtImportLineDto[]>(error);
    }
  }

  async getByRouteId(routeId: number): Promise<ApiResponse<WtImportLineDto[]>> {
    try {
      const response = await api.get<ApiResponse<WtImportLineDto[]>>(`/route/${routeId}`);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<WtImportLineDto[]>(error);
    }
  }

  async getByStockCode(stockCode: string): Promise<ApiResponse<WtImportLineDto[]>> {
    try {
      const response = await api.get<ApiResponse<WtImportLineDto[]>>(`/stock/${stockCode}`);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<WtImportLineDto[]>(error);
    }
  }

  async getByCellCode(cellCode: string): Promise<ApiResponse<WtImportLineDto[]>> {
    try {
      const response = await api.get<ApiResponse<WtImportLineDto[]>>(`/cell/${cellCode}`);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<WtImportLineDto[]>(error);
    }
  }

  async getByErpOrderNo(erpOrderNo: string): Promise<ApiResponse<WtImportLineDto[]>> {
    try {
      const response = await api.get<ApiResponse<WtImportLineDto[]>>(`/erp-order/${erpOrderNo}`);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<WtImportLineDto[]>(error);
    }
  }

  async create(createDto: CreateWtImportLineDto): Promise<ApiResponse<WtImportLineDto>> {
    try {
      const response = await api.post<ApiResponse<WtImportLineDto>>('', createDto);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<WtImportLineDto>(error);
    }
  }

  async update(id: number, updateDto: UpdateWtImportLineDto): Promise<ApiResponse<WtImportLineDto>> {
    try {
      const response = await api.put<ApiResponse<WtImportLineDto>>(`/${id}`, updateDto);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<WtImportLineDto>(error);
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

  async addBarcodeBasedonAssignedOrder(request: AddWtImportBarcodeRequestDto): Promise<ApiResponse<WtImportLineDto>> {
    try {
      const response = await api.post<ApiResponse<WtImportLineDto>>(`/addBarcodeBasedonAssignedOrder`, request);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<WtImportLineDto>(error);
    }
  }

}
