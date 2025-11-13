import axios from 'axios';
import { API_BASE_URL, DEFAULT_TIMEOUT, CURRENTLANGUAGE, getAuthToken } from '../baseUrl';
import { IGoodReciptFunctionsService } from '../Interfaces/IGoodReciptFunctionsService';
import { ApiResponse } from '../Models/ApiResponse';
import { GoodsOpenOrdersHeaderDto, GoodsOpenOrdersLineDto } from '../Models/GoodsReceiptFunctionsDtos';
import { ApiResponseErrorHelper } from '../ApiResponseErrorHelper';

const api = axios.create({
  baseURL: API_BASE_URL + "/GoodReciptFunctions",
  timeout: DEFAULT_TIMEOUT,
  headers: { 
    'Content-Type': 'application/json', 
    Accept: 'application/json',
    'X-Language': CURRENTLANGUAGE 
  },
});

// Request interceptor to add auth token
api.interceptors.request.use((config : any) => {
  const token = getAuthToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export class GoodReciptFunctionsService implements IGoodReciptFunctionsService {

    /**
     * Müşteri koduna göre açık siparişlerin header bilgilerini getirir
     * @param customerCode Müşteri kodu
     * @returns Açık sipariş header listesi
     */
    async getGoodsReceiptHeader(customerCode: string): Promise<ApiResponse<GoodsOpenOrdersHeaderDto[]>> {
        try {
            const response = await api.get<ApiResponse<GoodsOpenOrdersHeaderDto[]>>(`/header/${encodeURIComponent(customerCode)}`);
            return response.data;
        } catch (error) {
            return ApiResponseErrorHelper.create<GoodsOpenOrdersHeaderDto[]>(error);
        }
    }

    /**
     * Sipariş numaralarına göre sipariş detaylarını getirir
     * @param siparisNoCsv Virgülle ayrılmış sipariş numaraları
     * @returns Sipariş detay listesi
     */
    async getGoodsReceiptLine(siparisNoCsv: string): Promise<ApiResponse<GoodsOpenOrdersLineDto[]>> {
        try {
            const response = await api.get<ApiResponse<GoodsOpenOrdersLineDto[]>>(`/line/${encodeURIComponent(siparisNoCsv)}`);
            return response.data;
        } catch (error) {
            return ApiResponseErrorHelper.create<GoodsOpenOrdersLineDto[]>(error);
        }
    }

    /**
     * Müşteri koduna göre açık siparişlerin header bilgilerini POST ile getirir
     * @param customerCode Müşteri kodu
     * @returns Açık sipariş header listesi
     */
    async getGoodsReceiptHeaderByPost(customerCode: string): Promise<ApiResponse<GoodsOpenOrdersHeaderDto[]>> {
        try {
            const response = await api.post<ApiResponse<GoodsOpenOrdersHeaderDto[]>>('/header', { customerCode });
            return response.data;
        } catch (error) {
            return ApiResponseErrorHelper.create<GoodsOpenOrdersHeaderDto[]>(error);
        }
    }

    /**
     * Sipariş numaralarına göre sipariş detaylarını POST ile getirir
     * @param siparisNoCsv Virgülle ayrılmış sipariş numaraları
     * @returns Sipariş detay listesi
     */
    async getGoodsReceiptLineByPost(siparisNoCsv: string): Promise<ApiResponse<GoodsOpenOrdersLineDto[]>> {
        try {
            const response = await api.post<ApiResponse<GoodsOpenOrdersLineDto[]>>('/line', { siparisNoCsv });
            return response.data;
        } catch (error) {
            return ApiResponseErrorHelper.create<GoodsOpenOrdersLineDto[]>(error);
        }
    }

    /**
     * Belirli bir tarih aralığındaki açık siparişleri getirir
     * @param customerCode Müşteri kodu
     * @param startDate Başlangıç tarihi
     * @param endDate Bitiş tarihi
     * @returns Açık sipariş header listesi
     */
    async getGoodsReceiptHeaderByDateRange(
        customerCode: string, 
        startDate: string, 
        endDate: string
    ): Promise<ApiResponse<GoodsOpenOrdersHeaderDto[]>> {
        try {
            const response = await api.post<ApiResponse<GoodsOpenOrdersHeaderDto[]>>('/header/daterange', { 
                customerCode,
                startDate,
                endDate
            });
            return response.data;
        } catch (error) {
            return ApiResponseErrorHelper.create<GoodsOpenOrdersHeaderDto[]>(error);
        }
    }
}

