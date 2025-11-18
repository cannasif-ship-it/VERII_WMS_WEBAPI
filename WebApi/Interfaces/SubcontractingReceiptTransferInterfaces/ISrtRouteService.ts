import type { CreateSrtRouteDto, SrtRouteDto, UpdateSrtRouteDto } from '../../Models/index';
import type { ApiResponse, PagedResponse } from '../../ApiResponse';

export interface ISrtRouteService {
  getAll(): Promise<ApiResponse<SrtRouteDto[]>>;
  getById(id: number): Promise<ApiResponse<SrtRouteDto>>;
  getByLineId(lineId: number): Promise<ApiResponse<SrtRouteDto[]>>;
  getByStockCode(stockCode: string): Promise<ApiResponse<SrtRouteDto[]>>;
  getBySerialNo(serialNo: string): Promise<ApiResponse<SrtRouteDto[]>>;
  getBySourceWarehouse(sourceWarehouse: number): Promise<ApiResponse<SrtRouteDto[]>>;
  getByTargetWarehouse(targetWarehouse: number): Promise<ApiResponse<SrtRouteDto[]>>;
  getByQuantityRange(minQuantity: number, maxQuantity: number): Promise<ApiResponse<SrtRouteDto[]>>;
  create(createDto: CreateSrtRouteDto): Promise<ApiResponse<SrtRouteDto>>;
  update(id: number, updateDto: UpdateSrtRouteDto): Promise<ApiResponse<SrtRouteDto>>;
  softDelete(id: number): Promise<ApiResponse<boolean>>;
}
