import { CreateGrLineDto, GrLineDto, UpdateGrLineDto } from '../../Models/index';
import { ApiResponse, PagedResponse } from '../../Models/ApiResponse';

export interface IGrLineService {
  getAll(): Promise<ApiResponse<GrLineDto[]>>;
  getPaged(pageNumber: number, pageSize: number, sortBy: string, sortDirection: string): Promise<ApiResponse<PagedResponse<GrLineDto>>>;
  getById(id: number): Promise<ApiResponse<GrLineDto>>;
  getByHeaderId(headerId: number): Promise<ApiResponse<GrLineDto[]>>;
  create(createDto: CreateGrLineDto): Promise<ApiResponse<GrLineDto>>;
  update(id: number, updateDto: UpdateGrLineDto): Promise<ApiResponse<GrLineDto>>;
  softDelete(id: number): Promise<ApiResponse<boolean>>;
  exists(id: number): Promise<ApiResponse<boolean>>;
}
