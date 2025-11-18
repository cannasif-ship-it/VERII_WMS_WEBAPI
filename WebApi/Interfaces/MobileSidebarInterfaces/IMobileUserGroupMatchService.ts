import type { CreateMobileUserGroupMatchDto, MobileUserGroupMatchDto, UpdateMobileUserGroupMatchDto } from '../../Models/index';
import type { ApiResponse, PagedResponse } from '../../Models/ApiResponse';

export interface IMobileUserGroupMatchService {
  getAll(): Promise<ApiResponse<MobileUserGroupMatchDto[]>>;
  getById(id: number): Promise<ApiResponse<MobileUserGroupMatchDto>>;
  getByUserId(userId: number): Promise<ApiResponse<MobileUserGroupMatchDto[]>>;
  getByGroupCode(groupCode: string): Promise<ApiResponse<MobileUserGroupMatchDto[]>>;
  create(createDto: CreateMobileUserGroupMatchDto): Promise<ApiResponse<MobileUserGroupMatchDto>>;
  update(id: number, updateDto: UpdateMobileUserGroupMatchDto): Promise<ApiResponse<MobileUserGroupMatchDto>>;
  softDelete(id: number): Promise<ApiResponse<boolean>>;
}
