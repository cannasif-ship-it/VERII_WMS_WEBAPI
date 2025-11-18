import type { CreateSitLineDto, SitLineDto, UpdateSitLineDto } from '../../Models/index';
import type { ApiResponse, PagedResponse } from '../../Models/ApiResponse';

export interface ISitLineService {
  getAll(): Promise<ApiResponse<SitLineDto[]>>;
  getPaged(pageNumber: number, pageSize: number, sortBy: string, sortDirection: string): Promise<ApiResponse<PagedResponse<SitLineDto>>>;
  getById(id: number): Promise<ApiResponse<SitLineDto>>;
  getByHeaderId(headerId: number): Promise<ApiResponse<SitLineDto[]>>;
  getByStockCode(stockCode: string): Promise<ApiResponse<SitLineDto[]>>;
  getByErpOrderNo(erpOrderNo: string): Promise<ApiResponse<SitLineDto[]>>;
  getByQuantityRange(minQuantity: number, maxQuantity: number): Promise<ApiResponse<SitLineDto[]>>;
  create(createDto: CreateSitLineDto): Promise<ApiResponse<SitLineDto>>;
  update(id: number, updateDto: UpdateSitLineDto): Promise<ApiResponse<SitLineDto>>;
  softDelete(id: number): Promise<ApiResponse<boolean>>;
}
