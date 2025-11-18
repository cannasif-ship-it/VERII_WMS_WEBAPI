import type { CreatePtImportLineDto, PtImportLineDto, UpdatePtImportLineDto } from '../../Models/index';
import type { ApiResponse, PagedResponse } from '../../Models/ApiResponse';

export interface IPtImportLineService {
  getAll(): Promise<ApiResponse<PtImportLineDto[]>>;
  getById(id: number): Promise<ApiResponse<PtImportLineDto>>;
  getByHeaderId(headerId: number): Promise<ApiResponse<PtImportLineDto[]>>;
  getByLineId(lineId: number): Promise<ApiResponse<PtImportLineDto[]>>;
  getByStockCode(stockCode: string): Promise<ApiResponse<PtImportLineDto[]>>;
  create(createDto: CreatePtImportLineDto): Promise<ApiResponse<PtImportLineDto>>;
  update(id: number, updateDto: UpdatePtImportLineDto): Promise<ApiResponse<PtImportLineDto>>;
  softDelete(id: number): Promise<ApiResponse<boolean>>;
}
