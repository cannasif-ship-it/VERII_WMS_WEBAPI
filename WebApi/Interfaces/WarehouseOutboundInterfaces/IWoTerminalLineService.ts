import type { CreateWoTerminalLineDto, UpdateWoTerminalLineDto, WoTerminalLineDto } from '../../Models/index';
import type { ApiResponse, PagedResponse } from '../../ApiResponse';

export interface IWoTerminalLineService {
  getAll(): Promise<ApiResponse<WoTerminalLineDto[]>>;
  getById(id: number): Promise<ApiResponse<WoTerminalLineDto>>;
  getByHeaderId(headerId: number): Promise<ApiResponse<WoTerminalLineDto[]>>;
  getByUserId(userId: number): Promise<ApiResponse<WoTerminalLineDto[]>>;
  getByDateRange(startDate: Date, endDate: Date): Promise<ApiResponse<WoTerminalLineDto[]>>;
  create(createDto: CreateWoTerminalLineDto): Promise<ApiResponse<WoTerminalLineDto>>;
  update(id: number, updateDto: UpdateWoTerminalLineDto): Promise<ApiResponse<WoTerminalLineDto>>;
  softDelete(id: number): Promise<ApiResponse<boolean>>;
}
