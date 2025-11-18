import type { CariDto, DepoDto, OnHandQuantityDto, OpenGoodsForOrderByCustomerDto, OpenGoodsForOrderDetailDto, ProjeDto, StokDto } from '../Models/index';
import type { ApiResponse, PagedResponse } from '../ApiResponse';

export interface IErpService {
  getOnHandQuantityById(depoKodu: number, stokKodu: string, seriNo: string, projeKodu: string): Promise<ApiResponse<OnHandQuantityDto>>;
  getCaris(): Promise<ApiResponse<CariDto[]>>;
  getStoks(): Promise<ApiResponse<StokDto[]>>;
  getDepos(): Promise<ApiResponse<DepoDto[]>>;
  getProjeler(): Promise<ApiResponse<ProjeDto[]>>;
  getOpenGoodsForOrderByCustomerById(cariKodu: string): Promise<ApiResponse<OpenGoodsForOrderByCustomerDto>>;
  getOpenGoodsForOrderDetailsByOrderNumbers(orderNumber: string): Promise<ApiResponse<OpenGoodsForOrderDetailDto[]>>;
}
