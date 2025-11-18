import type { CreatePtHeaderDto, PtHeaderDto, UpdatePtHeaderDto } from '../../Models/index';
import type { ApiResponse, PagedResponse } from '../../Models/ApiResponse';

export interface IPtHeaderService {
  getAll(): Promise<ApiResponse<PtHeaderDto[]>>;
  getPaged(pageNumber: number, pageSize: number, sortBy: string, sortDirection: string): Promise<ApiResponse<PagedResponse<PtHeaderDto>>>;
  getById(id: number): Promise<ApiResponse<PtHeaderDto>>;
  getByBranchCode(branchCode: string): Promise<ApiResponse<PtHeaderDto[]>>;
  getByDateRange(startDate: Date, endDate: Date): Promise<ApiResponse<PtHeaderDto[]>>;
  getByCustomerCode(customerCode: string): Promise<ApiResponse<PtHeaderDto[]>>;
  getByDocumentType(documentType: string): Promise<ApiResponse<PtHeaderDto[]>>;
  create(createDto: CreatePtHeaderDto): Promise<ApiResponse<PtHeaderDto>>;
  update(id: number, updateDto: UpdatePtHeaderDto): Promise<ApiResponse<PtHeaderDto>>;
  softDelete(id: number): Promise<ApiResponse<boolean>>;
  complete(id: number): Promise<ApiResponse<boolean>>;
}
