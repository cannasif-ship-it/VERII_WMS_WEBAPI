import type { CreateUserAuthorityDto, UpdateUserAuthorityDto, UserAuthorityDto } from '../Models/index';
import type { ApiResponse, PagedResponse } from '../Models/ApiResponse';

export interface IUserAuthorityService {
  getAll(): Promise<ApiResponse<UserAuthorityDto[]>>;
  getById(id: number): Promise<ApiResponse<UserAuthorityDto>>;
  create(createDto: CreateUserAuthorityDto): Promise<ApiResponse<UserAuthorityDto>>;
  update(id: number, updateDto: UpdateUserAuthorityDto): Promise<ApiResponse<UserAuthorityDto>>;
  softDelete(id: number): Promise<ApiResponse<boolean>>;
  exists(id: number): Promise<ApiResponse<boolean>>;
}
