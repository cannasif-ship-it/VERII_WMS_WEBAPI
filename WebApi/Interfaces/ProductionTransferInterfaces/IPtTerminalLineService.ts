import { CreatePtTerminalLineDto, PtTerminalLineDto, UpdatePtTerminalLineDto } from '../../Models/index';
import { ApiResponse, PagedResponse } from '../../Models/ApiResponse';

export interface IPtTerminalLineService {
  getAll(): Promise<ApiResponse<PtTerminalLineDto[]>>;
  getById(id: number): Promise<ApiResponse<PtTerminalLineDto>>;
  getByHeaderId(headerId: number): Promise<ApiResponse<PtTerminalLineDto[]>>;
  getByUserId(userId: number): Promise<ApiResponse<PtTerminalLineDto[]>>;
  getByDateRange(startDate: Date, endDate: Date): Promise<ApiResponse<PtTerminalLineDto[]>>;
  create(createDto: CreatePtTerminalLineDto): Promise<ApiResponse<PtTerminalLineDto>>;
  update(id: number, updateDto: UpdatePtTerminalLineDto): Promise<ApiResponse<PtTerminalLineDto>>;
  softDelete(id: number): Promise<ApiResponse<boolean>>;
}
