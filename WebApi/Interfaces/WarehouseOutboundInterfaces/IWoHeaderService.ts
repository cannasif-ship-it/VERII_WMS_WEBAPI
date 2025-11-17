import { CreateWoHeaderDto, UpdateWoHeaderDto, WoHeaderDto } from '../../Models/index';
import { ApiResponse, PagedResponse } from '../../Models/ApiResponse';

export interface IWoHeaderService {
  getAll(): Promise<ApiResponse<WoHeaderDto[]>>;
  getPaged(pageNumber: number, pageSize: number, sortBy: string, sortDirection: string): Promise<ApiResponse<PagedResponse<WoHeaderDto>>>;
  getById(id: number): Promise<ApiResponse<WoHeaderDto>>;
  getByBranchCode(branchCode: string): Promise<ApiResponse<WoHeaderDto[]>>;
  getByDateRange(startDate: Date, endDate: Date): Promise<ApiResponse<WoHeaderDto[]>>;
  getByCustomerCode(customerCode: string): Promise<ApiResponse<WoHeaderDto[]>>;
  getByDocumentType(documentType: string): Promise<ApiResponse<WoHeaderDto[]>>;
  getByDocumentNo(documentNo: string): Promise<ApiResponse<WoHeaderDto[]>>;
  getByOutboundType(outboundType: string): Promise<ApiResponse<WoHeaderDto[]>>;
  getByAccountCode(accountCode: string): Promise<ApiResponse<WoHeaderDto[]>>;
  create(createDto: CreateWoHeaderDto): Promise<ApiResponse<WoHeaderDto>>;
  update(id: number, updateDto: UpdateWoHeaderDto): Promise<ApiResponse<WoHeaderDto>>;
  softDelete(id: number): Promise<ApiResponse<boolean>>;
  complete(id: number): Promise<ApiResponse<boolean>>;
}
