import { CreateSrtTerminalLineDto, SrtTerminalLineDto, UpdateSrtTerminalLineDto } from '../../Models/index';
import { ApiResponse, PagedResponse } from '../../Models/ApiResponse';

export interface ISrtTerminalLineService {
  getAll(): Promise<ApiResponse<SrtTerminalLineDto[]>>;
  getById(id: number): Promise<ApiResponse<SrtTerminalLineDto>>;
  getByHeaderId(headerId: number): Promise<ApiResponse<SrtTerminalLineDto[]>>;
  getByUserId(userId: number): Promise<ApiResponse<SrtTerminalLineDto[]>>;
  getByDateRange(startDate: Date, endDate: Date): Promise<ApiResponse<SrtTerminalLineDto[]>>;
  create(createDto: CreateSrtTerminalLineDto): Promise<ApiResponse<SrtTerminalLineDto>>;
  update(id: number, updateDto: UpdateSrtTerminalLineDto): Promise<ApiResponse<SrtTerminalLineDto>>;
  softDelete(id: number): Promise<ApiResponse<boolean>>;
}
