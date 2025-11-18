import type { CreateGrImportLDto, GrImportLDto, UpdateGrImportLDto } from '../../Models/index';
import type { ApiResponse, PagedResponse } from '../../ApiResponse';

export interface IGrImportLService {
  getAll(): Promise<ApiResponse<GrImportLDto[]>>;
  getPaged(pageNumber: number, pageSize: number, sortBy: string, sortDirection: string): Promise<ApiResponse<PagedResponse<GrImportLDto>>>;
  getById(id: number): Promise<ApiResponse<GrImportLDto>>;
  getByHeaderId(headerId: number): Promise<ApiResponse<GrImportLDto[]>>;
  getByLineId(lineId: number): Promise<ApiResponse<GrImportLDto[]>>;
  getByStockCode(stockCode: string): Promise<ApiResponse<GrImportLDto[]>>;
  create(createDto: CreateGrImportLDto): Promise<ApiResponse<GrImportLDto>>;
  update(id: number, updateDto: UpdateGrImportLDto): Promise<ApiResponse<GrImportLDto>>;
  softDelete(id: number): Promise<ApiResponse<boolean>>;
}
