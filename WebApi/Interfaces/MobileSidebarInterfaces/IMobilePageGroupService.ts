import type { CreateMobilePageGroupDto, MobilePageGroupDto, UpdateMobilePageGroupDto } from '../../Models/index';
import type { ApiResponse, PagedResponse } from '../../ApiResponse';

export interface IMobilePageGroupService {
  getAll(): Promise<ApiResponse<MobilePageGroupDto[]>>;
  getById(id: number): Promise<ApiResponse<MobilePageGroupDto>>;
  getByGroupCode(groupCode: string): Promise<ApiResponse<MobilePageGroupDto[]>>;
  getByMenuHeaderId(menuHeaderId: number): Promise<ApiResponse<MobilePageGroupDto[]>>;
  getByMenuLineId(menuLineId: number): Promise<ApiResponse<MobilePageGroupDto[]>>;
  create(createDto: CreateMobilePageGroupDto): Promise<ApiResponse<MobilePageGroupDto>>;
  update(id: number, updateDto: UpdateMobilePageGroupDto): Promise<ApiResponse<MobilePageGroupDto>>;
  softDelete(id: number): Promise<ApiResponse<boolean>>;
  getMobilPageGroupsByGroupCode(): Promise<ApiResponse<MobilePageGroupDto[]>>;
}
