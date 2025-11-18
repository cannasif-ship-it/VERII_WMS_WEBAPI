import type { CreateSitImportLineDto, SitImportLineDto, UpdateSitImportLineDto } from '../../Models/index';
import type { ApiResponse, PagedResponse } from '../../Models/ApiResponse';

export interface ISitImportLineService {
  getAll(): Promise<ApiResponse<SitImportLineDto[]>>;
  getById(id: number): Promise<ApiResponse<SitImportLineDto>>;
  getByHeaderId(headerId: number): Promise<ApiResponse<SitImportLineDto[]>>;
  getByLineId(lineId: number): Promise<ApiResponse<SitImportLineDto[]>>;
  getByStockCode(stockCode: string): Promise<ApiResponse<SitImportLineDto[]>>;
  create(createDto: CreateSitImportLineDto): Promise<ApiResponse<SitImportLineDto>>;
  update(id: number, updateDto: UpdateSitImportLineDto): Promise<ApiResponse<SitImportLineDto>>;
  softDelete(id: number): Promise<ApiResponse<boolean>>;
}
