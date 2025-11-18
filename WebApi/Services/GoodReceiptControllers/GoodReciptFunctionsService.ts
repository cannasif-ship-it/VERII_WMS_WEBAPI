import type { GoodsOpenOrdersHeaderDto, GoodsOpenOrdersLineDto } from '../../Models/index';
import axios from 'axios';
import { ApiResponseErrorHelper } from '../../ApiResponseErrorHelper';
import { API_BASE_URL, DEFAULT_TIMEOUT, CURRENTLANGUAGE, getAuthToken } from '../../baseUrl';
import type { ApiResponse, PagedResponse } from '../../Models/ApiResponse';
import type { IGoodReciptFunctionsService } from '../../Interfaces/index';

const api = axios.create({
  baseURL: API_BASE_URL + "/GoodReciptFunctions",
  timeout: DEFAULT_TIMEOUT,
  headers: { 'Content-Type': 'application/json', Accept: 'application/json', 'X-Language': CURRENTLANGUAGE },
});

api.interceptors.request.use((config : any) => { const token = getAuthToken(); if (token) { config.headers.Authorization = `Bearer ${token}`; } return config; });

export class GoodReciptFunctionsService implements IGoodReciptFunctionsService {
  async getGoodsReceiptHeader(customerCode: string): Promise<ApiResponse<GoodsOpenOrdersHeaderDto[]>> {
    try {
      const response = await api.get<ApiResponse<GoodsOpenOrdersHeaderDto[]>>(`/headers/customer/${customerCode}`);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<GoodsOpenOrdersHeaderDto[]>(error);
    }
  }

  async getGoodsReceiptLine(siparisNoCsv: string): Promise<ApiResponse<GoodsOpenOrdersLineDto[]>> {
    try {
      const response = await api.get<ApiResponse<GoodsOpenOrdersLineDto[]>>(`/lines/orders/${siparisNoCsv}`);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<GoodsOpenOrdersLineDto[]>(error);
    }
  }

}
