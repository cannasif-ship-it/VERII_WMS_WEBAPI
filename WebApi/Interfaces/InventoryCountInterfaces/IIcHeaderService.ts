import { CreateIcHeaderDto, IcHeaderDto, UpdateIcHeaderDto } from '../../Models/index';
import { ApiResponse, PagedResponse } from '../../Models/ApiResponse';

export interface IIcHeaderService {
  getAll(): Promise<ApiResponse<IcHeaderDto[]>>;
  getById(id: number): Promise<ApiResponse<IcHeaderDto>>;
  create(createDto: CreateIcHeaderDto): Promise<ApiResponse<IcHeaderDto>>;
  update(id: number, updateDto: UpdateIcHeaderDto): Promise<ApiResponse<IcHeaderDto>>;
  softDelete(id: number): Promise<ApiResponse<boolean>>;
}
