import { CreateWtRouteDto, UpdateWtRouteDto, WtRouteDto } from '../../Models/index';
import { ApiResponse, PagedResponse } from '../../Models/ApiResponse';

export interface IWtRouteService {
  getAll(): Promise<ApiResponse<WtRouteDto[]>>;
  getById(id: number): Promise<ApiResponse<WtRouteDto>>;
  getByLineId(lineId: number): Promise<ApiResponse<WtRouteDto[]>>;
  getByStockCode(stockCode: string): Promise<ApiResponse<WtRouteDto[]>>;
  getBySerialNo(serialNo: string): Promise<ApiResponse<WtRouteDto[]>>;
  getBySourceWarehouse(sourceWarehouse: string): Promise<ApiResponse<WtRouteDto[]>>;
  getByTargetWarehouse(targetWarehouse: string): Promise<ApiResponse<WtRouteDto[]>>;
  getByQuantityRange(minQuantity: number, maxQuantity: number): Promise<ApiResponse<WtRouteDto[]>>;
  create(createDto: CreateWtRouteDto): Promise<ApiResponse<WtRouteDto>>;
  update(id: number, updateDto: UpdateWtRouteDto): Promise<ApiResponse<WtRouteDto>>;
  softDelete(id: number): Promise<ApiResponse<boolean>>;
}
