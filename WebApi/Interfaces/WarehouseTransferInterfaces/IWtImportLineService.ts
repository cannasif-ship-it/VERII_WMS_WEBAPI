import type { CreateWtImportLineDto, UpdateWtImportLineDto, WtImportLineDto } from '../../Models/index';
import type { ApiResponse, PagedResponse } from '../../ApiResponse';

export interface IWtImportLineService {
  getAll(): Promise<ApiResponse<WtImportLineDto[]>>;
  getById(id: number): Promise<ApiResponse<WtImportLineDto>>;
  getByLineId(lineId: number): Promise<ApiResponse<WtImportLineDto[]>>;
  getByHeaderId(headerId: number): Promise<ApiResponse<WtImportLineDto[]>>;
  getByRouteId(routeId: number): Promise<ApiResponse<WtImportLineDto[]>>;
  getByStockCode(stockCode: string): Promise<ApiResponse<WtImportLineDto[]>>;
  getByErpOrderNo(erpOrderNo: string): Promise<ApiResponse<WtImportLineDto[]>>;
  getByCellCode(cellCode: string): Promise<ApiResponse<WtImportLineDto[]>>;
  create(createDto: CreateWtImportLineDto): Promise<ApiResponse<WtImportLineDto>>;
  update(id: number, updateDto: UpdateWtImportLineDto): Promise<ApiResponse<WtImportLineDto>>;
  softDelete(id: number): Promise<ApiResponse<boolean>>;
}
