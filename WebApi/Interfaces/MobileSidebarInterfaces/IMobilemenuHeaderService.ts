import { CreateMobilemenuHeaderDto, MobilemenuHeaderDto, UpdateMobilemenuHeaderDto } from '../../Models/index';
import { ApiResponse, PagedResponse } from '../../Models/ApiResponse';

export interface IMobilemenuHeaderService {
  getAll(): Promise<ApiResponse<MobilemenuHeaderDto[]>>;
  getById(id: number): Promise<ApiResponse<MobilemenuHeaderDto>>;
  getByMenuId(menuId: string): Promise<ApiResponse<MobilemenuHeaderDto>>;
  getByTitle(title: string): Promise<ApiResponse<MobilemenuHeaderDto[]>>;
  getOpenMenus(): Promise<ApiResponse<MobilemenuHeaderDto[]>>;
  create(createDto: CreateMobilemenuHeaderDto): Promise<ApiResponse<MobilemenuHeaderDto>>;
  update(id: number, updateDto: UpdateMobilemenuHeaderDto): Promise<ApiResponse<MobilemenuHeaderDto>>;
  softDelete(id: number): Promise<ApiResponse<boolean>>;
}
