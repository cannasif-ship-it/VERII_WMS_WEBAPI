import { CreateWiTerminalLineDto, UpdateWiTerminalLineDto, WiTerminalLineDto } from '../../Models/index';
import { ApiResponse, PagedResponse } from '../../Models/ApiResponse';

export interface IWiTerminalLineService {
  getAll(): Promise<ApiResponse<WiTerminalLineDto[]>>;
  getById(id: number): Promise<ApiResponse<WiTerminalLineDto>>;
  getByHeaderId(headerId: number): Promise<ApiResponse<WiTerminalLineDto[]>>;
  getByUserId(userId: number): Promise<ApiResponse<WiTerminalLineDto[]>>;
  getByDateRange(startDate: Date, endDate: Date): Promise<ApiResponse<WiTerminalLineDto[]>>;
  create(createDto: CreateWiTerminalLineDto): Promise<ApiResponse<WiTerminalLineDto>>;
  update(id: number, updateDto: UpdateWiTerminalLineDto): Promise<ApiResponse<WiTerminalLineDto>>;
  softDelete(id: number): Promise<ApiResponse<boolean>>;
}
