import { CreateIcImportLineDto, IcImportLineDto, UpdateIcImportLineDto } from '../../Models/index';
import { ApiResponse, PagedResponse } from '../../Models/ApiResponse';

export interface IIcImportLineService {
  getAll(): Promise<ApiResponse<IcImportLineDto[]>>;
  getById(id: number): Promise<ApiResponse<IcImportLineDto>>;
  getByHeaderId(headerId: number): Promise<ApiResponse<IcImportLineDto[]>>;
  create(createDto: CreateIcImportLineDto): Promise<ApiResponse<IcImportLineDto>>;
  update(id: number, updateDto: UpdateIcImportLineDto): Promise<ApiResponse<IcImportLineDto>>;
  softDelete(id: number): Promise<ApiResponse<boolean>>;
}
