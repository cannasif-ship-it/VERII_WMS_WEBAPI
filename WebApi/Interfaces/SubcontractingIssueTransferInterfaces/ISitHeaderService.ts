import type { CreateSitHeaderDto, SitHeaderDto, UpdateSitHeaderDto } from '../../Models/index';
import type { ApiResponse, PagedResponse } from '../../ApiResponse';

export interface ISitHeaderService {
  getAll(): Promise<ApiResponse<SitHeaderDto[]>>;
  getPaged(pageNumber: number, pageSize: number, sortBy: string, sortDirection: string): Promise<ApiResponse<PagedResponse<SitHeaderDto>>>;
  getById(id: number): Promise<ApiResponse<SitHeaderDto>>;
  getByBranchCode(branchCode: string): Promise<ApiResponse<SitHeaderDto[]>>;
  getByDateRange(startDate: Date, endDate: Date): Promise<ApiResponse<SitHeaderDto[]>>;
  getByCustomerCode(customerCode: string): Promise<ApiResponse<SitHeaderDto[]>>;
  getByDocumentType(documentType: string): Promise<ApiResponse<SitHeaderDto[]>>;
  getByDocumentNo(documentNo: string): Promise<ApiResponse<SitHeaderDto[]>>;
  create(createDto: CreateSitHeaderDto): Promise<ApiResponse<SitHeaderDto>>;
  update(id: number, updateDto: UpdateSitHeaderDto): Promise<ApiResponse<SitHeaderDto>>;
  softDelete(id: number): Promise<ApiResponse<boolean>>;
  complete(id: number): Promise<ApiResponse<boolean>>;
}
