import { BulkCreateWtRequestDto, WtHeaderDto } from '../../Models/index';
import axios from 'axios';
import { ApiResponseErrorHelper } from '../../ApiResponseErrorHelper';
import { API_BASE_URL, DEFAULT_TIMEOUT, CURRENTLANGUAGE, getAuthToken } from '../../baseUrl';
import { ApiResponse, PagedResponse } from '../../Models/ApiResponse';
import { IWtHeaderService } from '../../Interfaces/index';

const api = axios.create({
  baseURL: API_BASE_URL + "/WtHeader",
  timeout: DEFAULT_TIMEOUT,
  headers: { 'Content-Type': 'application/json', Accept: 'application/json', 'X-Language': CURRENTLANGUAGE },
});

api.interceptors.request.use((config : any) => { const token = getAuthToken(); if (token) { config.headers.Authorization = `Bearer ${token}`; } return config; });

export class WtHeaderService implements IWtHeaderService {
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

}
