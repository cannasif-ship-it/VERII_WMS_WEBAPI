import type { CreateWoImportLineDto, UpdateWoImportLineDto, WoImportLineDto } from '../../Models/index';
import type { ApiResponse, PagedResponse } from '../../Models/ApiResponse';

export interface IWoImportLineService {
  getAll(): Promise<ApiResponse<WoImportLineDto[]>>;
  getById(id: number): Promise<ApiResponse<WoImportLineDto>>;
  getByHeaderId(headerId: number): Promise<ApiResponse<WoImportLineDto[]>>;
  getByLineId(lineId: number): Promise<ApiResponse<WoImportLineDto[]>>;
  getByStockCode(stockCode: string): Promise<ApiResponse<WoImportLineDto[]>>;
  create(createDto: CreateWoImportLineDto): Promise<ApiResponse<WoImportLineDto>>;
  update(id: number, updateDto: UpdateWoImportLineDto): Promise<ApiResponse<WoImportLineDto>>;
  softDelete(id: number): Promise<ApiResponse<boolean>>;
}
