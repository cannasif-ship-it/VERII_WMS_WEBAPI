import type { CreateSrtImportLineDto, SrtImportLineDto, UpdateSrtImportLineDto } from '../../Models/index';
import type { ApiResponse, PagedResponse } from '../../Models/ApiResponse';

export interface ISrtImportLineService {
  getAll(): Promise<ApiResponse<SrtImportLineDto[]>>;
  getById(id: number): Promise<ApiResponse<SrtImportLineDto>>;
  getByHeaderId(headerId: number): Promise<ApiResponse<SrtImportLineDto[]>>;
  getByLineId(lineId: number): Promise<ApiResponse<SrtImportLineDto[]>>;
  getByStockCode(stockCode: string): Promise<ApiResponse<SrtImportLineDto[]>>;
  create(createDto: CreateSrtImportLineDto): Promise<ApiResponse<SrtImportLineDto>>;
  update(id: number, updateDto: UpdateSrtImportLineDto): Promise<ApiResponse<SrtImportLineDto>>;
  softDelete(id: number): Promise<ApiResponse<boolean>>;
}
