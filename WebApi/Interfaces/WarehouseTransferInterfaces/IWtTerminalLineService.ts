import type { CreateWtTerminalLineDto, UpdateWtTerminalLineDto, WtTerminalLineDto } from '../../Models/index';
import type { ApiResponse, PagedResponse } from '../../Models/ApiResponse';

export interface IWtTerminalLineService {
  getAll(): Promise<ApiResponse<WtTerminalLineDto[]>>;
  getById(id: number): Promise<ApiResponse<WtTerminalLineDto>>;
  getByHeaderId(headerId: number): Promise<ApiResponse<WtTerminalLineDto[]>>;
  getByUserId(userId: number): Promise<ApiResponse<WtTerminalLineDto[]>>;
  getByDateRange(startDate: Date, endDate: Date): Promise<ApiResponse<WtTerminalLineDto[]>>;
  create(createDto: CreateWtTerminalLineDto): Promise<ApiResponse<WtTerminalLineDto>>;
  update(id: number, updateDto: UpdateWtTerminalLineDto): Promise<ApiResponse<WtTerminalLineDto>>;
  softDelete(id: number): Promise<ApiResponse<boolean>>;
}
