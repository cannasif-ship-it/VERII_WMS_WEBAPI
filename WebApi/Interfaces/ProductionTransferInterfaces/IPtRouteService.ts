import { CreatePtRouteDto, PtRouteDto, UpdatePtRouteDto } from '../../Models/index';
import { ApiResponse, PagedResponse } from '../../Models/ApiResponse';

export interface IPtRouteService {
  getAll(): Promise<ApiResponse<PtRouteDto[]>>;
  getById(id: number): Promise<ApiResponse<PtRouteDto>>;
  getByImportLineId(importLineId: number): Promise<ApiResponse<PtRouteDto[]>>;
  getBySerialNo(serialNo: string): Promise<ApiResponse<PtRouteDto[]>>;
  getBySourceWarehouse(sourceWarehouse: number): Promise<ApiResponse<PtRouteDto[]>>;
  getByTargetWarehouse(targetWarehouse: number): Promise<ApiResponse<PtRouteDto[]>>;
  getByQuantityRange(minQuantity: number, maxQuantity: number): Promise<ApiResponse<PtRouteDto[]>>;
  create(createDto: CreatePtRouteDto): Promise<ApiResponse<PtRouteDto>>;
  update(id: number, updateDto: UpdatePtRouteDto): Promise<ApiResponse<PtRouteDto>>;
  softDelete(id: number): Promise<ApiResponse<boolean>>;
}
