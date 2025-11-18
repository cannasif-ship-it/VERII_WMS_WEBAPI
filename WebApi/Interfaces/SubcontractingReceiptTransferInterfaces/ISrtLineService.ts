import type { CreateSrtLineDto, SrtLineDto, UpdateSrtLineDto } from '../../Models/index';
import type { ApiResponse, PagedResponse } from '../../Models/ApiResponse';

export interface ISrtLineService {
  getAll(): Promise<ApiResponse<SrtLineDto[]>>;
  getPaged(pageNumber: number, pageSize: number, sortBy: string, sortDirection: string): Promise<ApiResponse<PagedResponse<SrtLineDto>>>;
  getById(id: number): Promise<ApiResponse<SrtLineDto>>;
  getByHeaderId(headerId: number): Promise<ApiResponse<SrtLineDto[]>>;
  getByStockCode(stockCode: string): Promise<ApiResponse<SrtLineDto[]>>;
  getByErpOrderNo(erpOrderNo: string): Promise<ApiResponse<SrtLineDto[]>>;
  getByQuantityRange(minQuantity: number, maxQuantity: number): Promise<ApiResponse<SrtLineDto[]>>;
  create(createDto: CreateSrtLineDto): Promise<ApiResponse<SrtLineDto>>;
  update(id: number, updateDto: UpdateSrtLineDto): Promise<ApiResponse<SrtLineDto>>;
  softDelete(id: number): Promise<ApiResponse<boolean>>;
}
