import type { CreateGrImportSerialLineDto, GrImportSerialLineDto, UpdateGrImportSerialLineDto } from '../../Models/index';
import type { ApiResponse, PagedResponse } from '../../Models/ApiResponse';

export interface IGrImportSerialLineService {
  getAll(): Promise<ApiResponse<GrImportSerialLineDto[]>>;
  getPaged(pageNumber: number, pageSize: number, sortBy: string, sortDirection: string): Promise<ApiResponse<PagedResponse<GrImportSerialLineDto>>>;
  getById(id: number): Promise<ApiResponse<GrImportSerialLineDto>>;
  getByImportLineId(importLineId: number): Promise<ApiResponse<GrImportSerialLineDto[]>>;
  create(createDto: CreateGrImportSerialLineDto): Promise<ApiResponse<GrImportSerialLineDto>>;
  update(id: number, updateDto: UpdateGrImportSerialLineDto): Promise<ApiResponse<GrImportSerialLineDto>>;
  softDelete(id: number): Promise<ApiResponse<boolean>>;
  exists(id: number): Promise<ApiResponse<boolean>>;
}
