import type { CreateWtLineDto, UpdateWtLineDto, WtLineDto } from '../../Models/index';
import type { ApiResponse, PagedResponse } from '../../Models/ApiResponse';

export interface IWtLineService {
  getAll(): Promise<ApiResponse<WtLineDto[]>>;
  getPaged(pageNumber: number, pageSize: number, sortBy: string, sortDirection: string): Promise<ApiResponse<PagedResponse<WtLineDto>>>;
  getById(id: number): Promise<ApiResponse<WtLineDto>>;
  getByHeaderId(headerId: number): Promise<ApiResponse<WtLineDto[]>>;
  getByStockCode(stockCode: string): Promise<ApiResponse<WtLineDto[]>>;
  getByErpOrderNo(erpOrderNo: string): Promise<ApiResponse<WtLineDto[]>>;
  getByQuantityRange(minQuantity: number, maxQuantity: number): Promise<ApiResponse<WtLineDto[]>>;
  create(createDto: CreateWtLineDto): Promise<ApiResponse<WtLineDto>>;
  update(id: number, updateDto: UpdateWtLineDto): Promise<ApiResponse<WtLineDto>>;
  softDelete(id: number): Promise<ApiResponse<boolean>>;
}
