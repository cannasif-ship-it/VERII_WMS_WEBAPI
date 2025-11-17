import { CreateIcTerminalLineDto, IcTerminalLineDto, UpdateIcTerminalLineDto } from '../../Models/index';
import { ApiResponse, PagedResponse } from '../../Models/ApiResponse';

export interface IIcTerminalLineService {
  getAll(): Promise<ApiResponse<IcTerminalLineDto[]>>;
  getById(id: number): Promise<ApiResponse<IcTerminalLineDto>>;
  getByHeaderId(headerId: number): Promise<ApiResponse<IcTerminalLineDto[]>>;
  create(createDto: CreateIcTerminalLineDto): Promise<ApiResponse<IcTerminalLineDto>>;
  update(id: number, updateDto: UpdateIcTerminalLineDto): Promise<ApiResponse<IcTerminalLineDto>>;
  softDelete(id: number): Promise<ApiResponse<boolean>>;
}
