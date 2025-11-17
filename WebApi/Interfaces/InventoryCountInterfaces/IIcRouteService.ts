import { CreateIcRouteDto, IcRouteDto, UpdateIcRouteDto } from '../../Models/index';
import { ApiResponse, PagedResponse } from '../../Models/ApiResponse';

export interface IIcRouteService {
  getAll(): Promise<ApiResponse<IcRouteDto[]>>;
  getById(id: number): Promise<ApiResponse<IcRouteDto>>;
  getByImportLineId(importLineId: number): Promise<ApiResponse<IcRouteDto[]>>;
  create(createDto: CreateIcRouteDto): Promise<ApiResponse<IcRouteDto>>;
  update(id: number, updateDto: UpdateIcRouteDto): Promise<ApiResponse<IcRouteDto>>;
  softDelete(id: number): Promise<ApiResponse<boolean>>;
}
