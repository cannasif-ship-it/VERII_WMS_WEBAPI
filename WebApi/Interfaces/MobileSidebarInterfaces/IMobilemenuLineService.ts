import type { CreateMobilemenuLineDto, MobilemenuLineDto, UpdateMobilemenuLineDto } from '../../Models/index';
import type { ApiResponse, PagedResponse } from '../../Models/ApiResponse';

export interface IMobilemenuLineService {
  getAll(): Promise<ApiResponse<MobilemenuLineDto[]>>;
  getById(id: number): Promise<ApiResponse<MobilemenuLineDto>>;
  getByItemId(itemId: string): Promise<ApiResponse<MobilemenuLineDto>>;
  getByHeaderId(headerId: number): Promise<ApiResponse<MobilemenuLineDto[]>>;
  getByTitle(title: string): Promise<ApiResponse<MobilemenuLineDto[]>>;
  create(createDto: CreateMobilemenuLineDto): Promise<ApiResponse<MobilemenuLineDto>>;
  update(id: number, updateDto: UpdateMobilemenuLineDto): Promise<ApiResponse<MobilemenuLineDto>>;
  softDelete(id: number): Promise<ApiResponse<boolean>>;
}
