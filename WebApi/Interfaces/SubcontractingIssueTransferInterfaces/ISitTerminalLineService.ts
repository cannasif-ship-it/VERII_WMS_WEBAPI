import type { CreateSitTerminalLineDto, SitTerminalLineDto, UpdateSitTerminalLineDto } from '../../Models/index';
import type { ApiResponse, PagedResponse } from '../../Models/ApiResponse';

export interface ISitTerminalLineService {
  getAll(): Promise<ApiResponse<SitTerminalLineDto[]>>;
  getById(id: number): Promise<ApiResponse<SitTerminalLineDto>>;
  getByHeaderId(headerId: number): Promise<ApiResponse<SitTerminalLineDto[]>>;
  getByUserId(userId: number): Promise<ApiResponse<SitTerminalLineDto[]>>;
  getByDateRange(startDate: Date, endDate: Date): Promise<ApiResponse<SitTerminalLineDto[]>>;
  create(createDto: CreateSitTerminalLineDto): Promise<ApiResponse<SitTerminalLineDto>>;
  update(id: number, updateDto: UpdateSitTerminalLineDto): Promise<ApiResponse<SitTerminalLineDto>>;
  softDelete(id: number): Promise<ApiResponse<boolean>>;
}
