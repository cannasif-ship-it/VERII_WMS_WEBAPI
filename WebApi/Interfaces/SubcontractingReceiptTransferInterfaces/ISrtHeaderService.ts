import type { CreateSrtHeaderDto, SrtHeaderDto, UpdateSrtHeaderDto } from '../../Models/index';
import type { ApiResponse, PagedResponse } from '../../Models/ApiResponse';

export interface ISrtHeaderService {
  getAll(): Promise<ApiResponse<SrtHeaderDto[]>>;
  getPaged(pageNumber: number, pageSize: number, sortBy: string, sortDirection: string): Promise<ApiResponse<PagedResponse<SrtHeaderDto>>>;
  getById(id: number): Promise<ApiResponse<SrtHeaderDto>>;
  getByBranchCode(branchCode: string): Promise<ApiResponse<SrtHeaderDto[]>>;
  getByDateRange(startDate: Date, endDate: Date): Promise<ApiResponse<SrtHeaderDto[]>>;
  getByCustomerCode(customerCode: string): Promise<ApiResponse<SrtHeaderDto[]>>;
  getByDocumentType(documentType: string): Promise<ApiResponse<SrtHeaderDto[]>>;
  getByDocumentNo(documentNo: string): Promise<ApiResponse<SrtHeaderDto[]>>;
  create(createDto: CreateSrtHeaderDto): Promise<ApiResponse<SrtHeaderDto>>;
  update(id: number, updateDto: UpdateSrtHeaderDto): Promise<ApiResponse<SrtHeaderDto>>;
  softDelete(id: number): Promise<ApiResponse<boolean>>;
  complete(id: number): Promise<ApiResponse<boolean>>;
}
