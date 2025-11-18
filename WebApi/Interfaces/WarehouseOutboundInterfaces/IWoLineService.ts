import type { CreateWoLineDto, UpdateWoLineDto, WoLineDto } from '../../Models/index';
import type { ApiResponse, PagedResponse } from '../../Models/ApiResponse';

export interface IWoLineService {
  getAll(): Promise<ApiResponse<WoLineDto[]>>;
  getPaged(pageNumber: number, pageSize: number, sortBy: string, sortDirection: string): Promise<ApiResponse<PagedResponse<WoLineDto>>>;
  getById(id: number): Promise<ApiResponse<WoLineDto>>;
  getByHeaderId(headerId: number): Promise<ApiResponse<WoLineDto[]>>;
  getByStockCode(stockCode: string): Promise<ApiResponse<WoLineDto[]>>;
  getByErpOrderNo(erpOrderNo: string): Promise<ApiResponse<WoLineDto[]>>;
  getByQuantityRange(minQuantity: number, maxQuantity: number): Promise<ApiResponse<WoLineDto[]>>;
  create(createDto: CreateWoLineDto): Promise<ApiResponse<WoLineDto>>;
  update(id: number, updateDto: UpdateWoLineDto): Promise<ApiResponse<WoLineDto>>;
  softDelete(id: number): Promise<ApiResponse<boolean>>;
}
