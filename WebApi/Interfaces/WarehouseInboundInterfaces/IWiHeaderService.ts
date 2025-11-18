import type { CreateWiHeaderDto, UpdateWiHeaderDto, WiHeaderDto } from '../../Models/index';
import type { ApiResponse, PagedResponse } from '../../Models/ApiResponse';

export interface IWiHeaderService {
  getAll(): Promise<ApiResponse<WiHeaderDto[]>>;
  getPaged(pageNumber: number, pageSize: number, sortBy: string, sortDirection: string): Promise<ApiResponse<PagedResponse<WiHeaderDto>>>;
  getById(id: number): Promise<ApiResponse<WiHeaderDto>>;
  getByBranchCode(branchCode: string): Promise<ApiResponse<WiHeaderDto[]>>;
  getByDateRange(startDate: Date, endDate: Date): Promise<ApiResponse<WiHeaderDto[]>>;
  getByCustomerCode(customerCode: string): Promise<ApiResponse<WiHeaderDto[]>>;
  getByDocumentType(documentType: string): Promise<ApiResponse<WiHeaderDto[]>>;
  getByDocumentNo(documentNo: string): Promise<ApiResponse<WiHeaderDto[]>>;
  getByInboundType(inboundType: string): Promise<ApiResponse<WiHeaderDto[]>>;
  getByAccountCode(accountCode: string): Promise<ApiResponse<WiHeaderDto[]>>;
  create(createDto: CreateWiHeaderDto): Promise<ApiResponse<WiHeaderDto>>;
  update(id: number, updateDto: UpdateWiHeaderDto): Promise<ApiResponse<WiHeaderDto>>;
  softDelete(id: number): Promise<ApiResponse<boolean>>;
  complete(id: number): Promise<ApiResponse<boolean>>;
}
