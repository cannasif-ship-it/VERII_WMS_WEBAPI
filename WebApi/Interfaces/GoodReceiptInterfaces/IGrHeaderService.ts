import { BulkCreateGrRequestDto, CreateGrHeaderDto, GrHeaderDto, UpdateGrHeaderDto } from '../../Models/index';
import { ApiResponse, PagedResponse } from '../../Models/ApiResponse';

export interface IGrHeaderService {
  getAll(): Promise<ApiResponse<GrHeaderDto[]>>;
  getPaged(pageNumber: number, pageSize: number, sortBy: string, sortDirection: string): Promise<ApiResponse<PagedResponse<GrHeaderDto>>>;
  getById(id: number): Promise<ApiResponse<GrHeaderDto>>;
  create(createDto: CreateGrHeaderDto): Promise<ApiResponse<GrHeaderDto>>;
  update(id: number, updateDto: UpdateGrHeaderDto): Promise<ApiResponse<GrHeaderDto>>;
  softDelete(id: number): Promise<ApiResponse<boolean>>;
  complete(id: number): Promise<ApiResponse<boolean>>;
  getByCustomerCode(customerCode: string): Promise<ApiResponse<GrHeaderDto[]>>;
  getByDateRange(startDate: Date, endDate: Date): Promise<ApiResponse<GrHeaderDto[]>>;
  bulkCreateCorrelated(request: BulkCreateGrRequestDto): Promise<ApiResponse<number>>;
  getByBranchCode(branchCode: string): Promise<ApiResponse<GrHeaderDto[]>>;
}
