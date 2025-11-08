import { ApiResponse, PagedResult } from '../Models/ApiResponse';
import { GrImportLDto, CreateGrImportLDto, UpdateGrImportLDto } from '../Models/GrImportLDtos';

export interface IGrImportLService {
  getAll(): Promise<ApiResponse<GrImportLDto[]>>;
  getById(id: number): Promise<ApiResponse<GrImportLDto | null>>;
  getByHeaderId(headerId: number): Promise<ApiResponse<GrImportLDto[]>>;
  getByLineId(lineId: number): Promise<ApiResponse<GrImportLDto[]>>;
  getByStockCode(stockCode: string): Promise<ApiResponse<GrImportLDto[]>>;
  create(createDto: CreateGrImportLDto): Promise<ApiResponse<GrImportLDto>>;
  update(id: number, updateDto: UpdateGrImportLDto): Promise<ApiResponse<GrImportLDto>>;
  softDelete(id: number): Promise<ApiResponse<boolean>>;
  getActive(): Promise<ApiResponse<GrImportLDto[]>>;
  getPaged(pageNumber: number, pageSize: number, sortBy: string, sortDirection: 'asc' | 'desc'): Promise<ApiResponse<PagedResult<GrImportLDto>>>;
}