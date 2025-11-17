import { CreateWoRouteDto, UpdateWoRouteDto, WoRouteDto } from '../../Models/index';
import { ApiResponse, PagedResponse } from '../../Models/ApiResponse';

export interface IWoRouteService {
  getAll(): Promise<ApiResponse<WoRouteDto[]>>;
  getById(id: number): Promise<ApiResponse<WoRouteDto>>;
  getByLineId(lineId: number): Promise<ApiResponse<WoRouteDto[]>>;
  getByStockCode(stockCode: string): Promise<ApiResponse<WoRouteDto[]>>;
  getBySerialNo(serialNo: string): Promise<ApiResponse<WoRouteDto[]>>;
  getBySourceWarehouse(sourceWarehouse: number): Promise<ApiResponse<WoRouteDto[]>>;
  getByTargetWarehouse(targetWarehouse: number): Promise<ApiResponse<WoRouteDto[]>>;
  getByQuantityRange(minQuantity: number, maxQuantity: number): Promise<ApiResponse<WoRouteDto[]>>;
  create(createDto: CreateWoRouteDto): Promise<ApiResponse<WoRouteDto>>;
  update(id: number, updateDto: UpdateWoRouteDto): Promise<ApiResponse<WoRouteDto>>;
  softDelete(id: number): Promise<ApiResponse<boolean>>;
}
