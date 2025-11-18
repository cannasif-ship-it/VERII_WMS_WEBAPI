import type { CreateSitRouteDto, SitRouteDto, UpdateSitRouteDto } from '../../Models/index';
import type { ApiResponse, PagedResponse } from '../../Models/ApiResponse';

export interface ISitRouteService {
  getAll(): Promise<ApiResponse<SitRouteDto[]>>;
  getById(id: number): Promise<ApiResponse<SitRouteDto>>;
  getByLineId(lineId: number): Promise<ApiResponse<SitRouteDto[]>>;
  getByStockCode(stockCode: string): Promise<ApiResponse<SitRouteDto[]>>;
  getBySerialNo(serialNo: string): Promise<ApiResponse<SitRouteDto[]>>;
  getBySourceWarehouse(sourceWarehouse: number): Promise<ApiResponse<SitRouteDto[]>>;
  getByTargetWarehouse(targetWarehouse: number): Promise<ApiResponse<SitRouteDto[]>>;
  getByQuantityRange(minQuantity: number, maxQuantity: number): Promise<ApiResponse<SitRouteDto[]>>;
  create(createDto: CreateSitRouteDto): Promise<ApiResponse<SitRouteDto>>;
  update(id: number, updateDto: UpdateSitRouteDto): Promise<ApiResponse<SitRouteDto>>;
  softDelete(id: number): Promise<ApiResponse<boolean>>;
}
