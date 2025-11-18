import type { CreateSidebarmenuHeaderDto, SidebarmenuHeaderDto, UpdateSidebarmenuHeaderDto } from '../../Models/index';
import type { ApiResponse, PagedResponse } from '../../Models/ApiResponse';

export interface ISidebarmenuHeaderService {
  getAll(): Promise<ApiResponse<SidebarmenuHeaderDto[]>>;
  getPaged(pageNumber: number, pageSize: number, sortBy: string, sortDirection: string): Promise<ApiResponse<PagedResponse<SidebarmenuHeaderDto>>>;
  getById(id: number): Promise<ApiResponse<SidebarmenuHeaderDto>>;
  create(createDto: CreateSidebarmenuHeaderDto): Promise<ApiResponse<SidebarmenuHeaderDto>>;
  update(id: number, updateDto: UpdateSidebarmenuHeaderDto): Promise<ApiResponse<SidebarmenuHeaderDto>>;
  softDelete(id: number): Promise<ApiResponse<boolean>>;
  exists(id: number): Promise<ApiResponse<boolean>>;
  getByMenuKey(menuKey: string): Promise<ApiResponse<SidebarmenuHeaderDto>>;
  getByRoleLevel(roleLevel: number): Promise<ApiResponse<SidebarmenuHeaderDto[]>>;
}
