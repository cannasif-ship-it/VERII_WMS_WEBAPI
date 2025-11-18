import type { CreatePtLineDto, PtLineDto, UpdatePtLineDto } from '../../Models/index';
import type { ApiResponse, PagedResponse } from '../../ApiResponse';

export interface IPtLineService {
  getAll(): Promise<ApiResponse<PtLineDto[]>>;
  getPaged(pageNumber: number, pageSize: number, sortBy: string, sortDirection: string): Promise<ApiResponse<PagedResponse<PtLineDto>>>;
  getById(id: number): Promise<ApiResponse<PtLineDto>>;
  getByHeaderId(headerId: number): Promise<ApiResponse<PtLineDto[]>>;
  getByStockCode(stockCode: string): Promise<ApiResponse<PtLineDto[]>>;
  getByErpOrderNo(erpOrderNo: string): Promise<ApiResponse<PtLineDto[]>>;
  getByQuantityRange(minQuantity: number, maxQuantity: number): Promise<ApiResponse<PtLineDto[]>>;
  create(createDto: CreatePtLineDto): Promise<ApiResponse<PtLineDto>>;
  update(id: number, updateDto: UpdatePtLineDto): Promise<ApiResponse<PtLineDto>>;
  softDelete(id: number): Promise<ApiResponse<boolean>>;
}
