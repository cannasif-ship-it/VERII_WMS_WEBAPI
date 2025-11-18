import type { CreateWiImportLineDto, UpdateWiImportLineDto, WiImportLineDto } from '../../Models/index';
import type { ApiResponse, PagedResponse } from '../../Models/ApiResponse';

export interface IWiImportLineService {
  getAll(): Promise<ApiResponse<WiImportLineDto[]>>;
  getById(id: number): Promise<ApiResponse<WiImportLineDto>>;
  getByHeaderId(headerId: number): Promise<ApiResponse<WiImportLineDto[]>>;
  getByLineId(lineId: number): Promise<ApiResponse<WiImportLineDto[]>>;
  getByStockCode(stockCode: string): Promise<ApiResponse<WiImportLineDto[]>>;
  create(createDto: CreateWiImportLineDto): Promise<ApiResponse<WiImportLineDto>>;
  update(id: number, updateDto: UpdateWiImportLineDto): Promise<ApiResponse<WiImportLineDto>>;
  softDelete(id: number): Promise<ApiResponse<boolean>>;
}
