import type { BulkCreateWtRequestDto, CreateWtHeaderDto, GenerateWarehouseTransferOrderRequestDto, UpdateWtHeaderDto, WtHeaderDto } from '../../Models/index';
import type { ApiResponse, PagedResponse } from '../../Models/ApiResponse';

export interface IWtHeaderService {
  getAll(): Promise<ApiResponse<WtHeaderDto[]>>;
  getPaged(pageNumber: number, pageSize: number, sortBy: string, sortDirection: string): Promise<ApiResponse<PagedResponse<WtHeaderDto>>>;
  getById(id: number): Promise<ApiResponse<WtHeaderDto>>;
  getByBranchCode(branchCode: string): Promise<ApiResponse<WtHeaderDto[]>>;
  getByDateRange(startDate: Date, endDate: Date): Promise<ApiResponse<WtHeaderDto[]>>;
  getByCustomerCode(customerCode: string): Promise<ApiResponse<WtHeaderDto[]>>;
  getByDocumentType(documentType: string): Promise<ApiResponse<WtHeaderDto[]>>;
  getByDocumentNo(documentNo: string): Promise<ApiResponse<WtHeaderDto[]>>;
  create(createDto: CreateWtHeaderDto): Promise<ApiResponse<WtHeaderDto>>;
  update(id: number, updateDto: UpdateWtHeaderDto): Promise<ApiResponse<WtHeaderDto>>;
  softDelete(id: number): Promise<ApiResponse<boolean>>;
  complete(id: number): Promise<ApiResponse<boolean>>;
  bulkCreateInterWarehouseTransfer(request: BulkCreateWtRequestDto): Promise<ApiResponse<number>>;
  getAssignedTransferOrders(userId: number): Promise<ApiResponse<WtHeaderDto[]>>;
  getCompletedAwaitingErpApproval(): Promise<ApiResponse<WtHeaderDto[]>>;
  generateWarehouseTransferOrder(request: GenerateWarehouseTransferOrderRequestDto): Promise<ApiResponse<WtHeaderDto>>;
}
