import { TransferOpenOrderHeaderDto, TransferOpenOrderLineDto } from '../../Models/index';
import axios from 'axios';
import { ApiResponseErrorHelper } from '../../ApiResponseErrorHelper';
import { API_BASE_URL, DEFAULT_TIMEOUT, CURRENTLANGUAGE, getAuthToken } from '../../baseUrl';
import { ApiResponse, PagedResponse } from '../../Models/ApiResponse';
import { IWtFunctionService } from '../../Interfaces/index';

const api = axios.create({
  baseURL: API_BASE_URL + "/WtFunction",
  timeout: DEFAULT_TIMEOUT,
  headers: { 'Content-Type': 'application/json', Accept: 'application/json', 'X-Language': CURRENTLANGUAGE },
});

api.interceptors.request.use((config : any) => { const token = getAuthToken(); if (token) { config.headers.Authorization = `Bearer ${token}`; } return config; });

export class WtFunctionService implements IWtFunctionService {
  async getTransferOpenOrderHeader(customerCode: string): Promise<ApiResponse<TransferOpenOrderHeaderDto[]>> {
    try {
      const response = await api.get<ApiResponse<TransferOpenOrderHeaderDto[]>>(`/headers/${customerCode}`);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<TransferOpenOrderHeaderDto[]>(error);
    }
  }

  async getTransferOpenOrderLine(siparisNoCsv: string): Promise<ApiResponse<TransferOpenOrderLineDto[]>> {
    try {
      const response = await api.get<ApiResponse<TransferOpenOrderLineDto[]>>(`/lines/${siparisNoCsv}`);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<TransferOpenOrderLineDto[]>(error);
    }
  }

}
