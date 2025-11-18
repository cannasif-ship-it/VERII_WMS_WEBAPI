import type { CreateSidebarmenuLineDto, SidebarmenuLineDto, UpdateSidebarmenuLineDto } from '../../Models/index';
import type { ApiResponse, PagedResponse } from '../../Models/ApiResponse';

export interface ISidebarmenuLineService {
  getAll(): Promise<ApiResponse<SidebarmenuLineDto[]>>;
  getPaged(pageNumber: number, pageSize: number, sortBy: string, sortDirection: string): Promise<ApiResponse<PagedResponse<SidebarmenuLineDto>>>;
  getById(id: number): Promise<ApiResponse<SidebarmenuLineDto>>;
  create(createDto: CreateSidebarmenuLineDto): Promise<ApiResponse<SidebarmenuLineDto>>;
  update(id: number, updateDto: UpdateSidebarmenuLineDto): Promise<ApiResponse<SidebarmenuLineDto>>;
  softDelete(id: number): Promise<ApiResponse<boolean>>;
  exists(id: number): Promise<ApiResponse<boolean>>;
  getByHeaderId(headerId: number): Promise<ApiResponse<SidebarmenuLineDto[]>>;
  getByPage(page: string): Promise<ApiResponse<SidebarmenuLineDto>>;
}
