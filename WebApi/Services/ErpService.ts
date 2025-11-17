import { any, CariDto, DepoDto, OnHandQuantityDto, OpenGoodsForOrderByCustomerDto, OpenGoodsForOrderDetailDto, ProjeDto, StokDto } from '../Models/index';
import axios from 'axios';
import { ApiResponseErrorHelper } from '../ApiResponseErrorHelper';
import { API_BASE_URL, DEFAULT_TIMEOUT, CURRENTLANGUAGE, getAuthToken } from '../baseUrl';
import { ApiResponse, PagedResponse } from '../Models/ApiResponse';
import { IErpService } from '../Interfaces/index';

const api = axios.create({
  baseURL: API_BASE_URL + "/Erp",
  timeout: DEFAULT_TIMEOUT,
  headers: { 'Content-Type': 'application/json', Accept: 'application/json', 'X-Language': CURRENTLANGUAGE },
});

api.interceptors.request.use((config : any) => { const token = getAuthToken(); if (token) { config.headers.Authorization = `Bearer ${token}`; } return config; });

export class ErpService implements IErpService {
  async getOnHandQuantityById(depoKodu: number, stokKodu: string, seriNo: string, projeKodu: string): Promise<ApiResponse<OnHandQuantityDto>> {
    try {
      const response = await api.get<ApiResponse<OnHandQuantityDto>>(`/get-onhand-quantity-by-id/${depoKodu}/${stokKodu}/${seriNo}/${projeKodu}`, { params: { depoKodu: depoKodu, stokKodu: stokKodu, seriNo: seriNo, projeKodu: projeKodu } });
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<OnHandQuantityDto>(error);
    }
  }

  async getCaris(): Promise<ApiResponse<CariDto[]>> {
    try {
      const response = await api.get<ApiResponse<CariDto[]>>(`/getCari`);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<CariDto[]>(error);
    }
  }

  async getStoks(): Promise<ApiResponse<StokDto[]>> {
    try {
      const response = await api.get<ApiResponse<StokDto[]>>(`/getStoks`);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<StokDto[]>(error);
    }
  }

  async getDepos(): Promise<ApiResponse<DepoDto[]>> {
    try {
      const response = await api.get<ApiResponse<DepoDto[]>>(`/getDepos`);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<DepoDto[]>(error);
    }
  }

  async getProjeler(): Promise<ApiResponse<ProjeDto[]>> {
    try {
      const response = await api.get<ApiResponse<ProjeDto[]>>(`/getProjeler`);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<ProjeDto[]>(error);
    }
  }

  async getOpenGoodsForOrderByCustomerById(cariKodu: string): Promise<ApiResponse<OpenGoodsForOrderByCustomerDto>> {
    try {
      const response = await api.get<ApiResponse<OpenGoodsForOrderByCustomerDto>>(`/get-open-goods-for-order-by-customer-by-id/${cariKodu}`);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<OpenGoodsForOrderByCustomerDto>(error);
    }
  }

  async getOpenGoodsForOrderDetailsByOrderNumbers(orderNumber: string): Promise<ApiResponse<OpenGoodsForOrderDetailDto[]>> {
    try {
      const response = await api.get<ApiResponse<OpenGoodsForOrderDetailDto[]>>(`/get-open-goods-for-order-details-by-order-number/${orderNumber}`);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<OpenGoodsForOrderDetailDto[]>(error);
    }
  }

  async healthCheck(): Promise<ApiResponse<any>> {
    try {
      const response = await api.get<ApiResponse<any>>(`/health-check`);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<any>(error);
    }
  }

}
