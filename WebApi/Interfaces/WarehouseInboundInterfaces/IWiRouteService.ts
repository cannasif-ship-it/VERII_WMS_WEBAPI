import type { CreateWiRouteDto, UpdateWiRouteDto, WiRouteDto } from '../../Models/index';
import type { ApiResponse, PagedResponse } from '../../ApiResponse';

export interface IWiRouteService {
  getAll(): Promise<ApiResponse<WiRouteDto[]>>;
  getById(id: number): Promise<ApiResponse<WiRouteDto>>;
  getByLineId(lineId: number): Promise<ApiResponse<WiRouteDto[]>>;
  getByStockCode(stockCode: string): Promise<ApiResponse<WiRouteDto[]>>;
  getBySerialNo(serialNo: string): Promise<ApiResponse<WiRouteDto[]>>;
  getBySourceWarehouse(sourceWarehouse: number): Promise<ApiResponse<WiRouteDto[]>>;
  getByTargetWarehouse(targetWarehouse: number): Promise<ApiResponse<WiRouteDto[]>>;
  getByQuantityRange(minQuantity: number, maxQuantity: number): Promise<ApiResponse<WiRouteDto[]>>;
  create(createDto: CreateWiRouteDto): Promise<ApiResponse<WiRouteDto>>;
  update(id: number, updateDto: UpdateWiRouteDto): Promise<ApiResponse<WiRouteDto>>;
  softDelete(id: number): Promise<ApiResponse<boolean>>;
}
