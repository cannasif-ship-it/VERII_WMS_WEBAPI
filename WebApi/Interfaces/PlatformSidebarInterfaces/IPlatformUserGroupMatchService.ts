import { CreatePlatformUserGroupMatchDto, PlatformUserGroupMatchDto, UpdatePlatformUserGroupMatchDto } from '../../Models/index';
import { ApiResponse, PagedResponse } from '../../Models/ApiResponse';

export interface IPlatformUserGroupMatchService {
  getAll(): Promise<ApiResponse<PlatformUserGroupMatchDto[]>>;
  getById(id: number): Promise<ApiResponse<PlatformUserGroupMatchDto>>;
  create(createDto: CreatePlatformUserGroupMatchDto): Promise<ApiResponse<PlatformUserGroupMatchDto>>;
  update(id: number, updateDto: UpdatePlatformUserGroupMatchDto): Promise<ApiResponse<PlatformUserGroupMatchDto>>;
  softDelete(id: number): Promise<ApiResponse<boolean>>;
  exists(id: number): Promise<ApiResponse<boolean>>;
  getByUserId(userId: number): Promise<ApiResponse<PlatformUserGroupMatchDto[]>>;
  getByGroupCode(groupCode: string): Promise<ApiResponse<PlatformUserGroupMatchDto[]>>;
}
