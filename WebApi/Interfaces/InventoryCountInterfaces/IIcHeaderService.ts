import type { CreateIcHeaderDto, IcHeaderDto, UpdateIcHeaderDto } from '../../Models/index';
import type { ApiResponse, PagedResponse } from '../../ApiResponse';

export interface IIcHeaderService {
  getAll(): Promise<ApiResponse<IcHeaderDto[]>>;
  getById(id: number): Promise<ApiResponse<IcHeaderDto>>;
  create(createDto: CreateIcHeaderDto): Promise<ApiResponse<IcHeaderDto>>;
  update(id: number, updateDto: UpdateIcHeaderDto): Promise<ApiResponse<IcHeaderDto>>;
  softDelete(id: number): Promise<ApiResponse<boolean>>;
}
