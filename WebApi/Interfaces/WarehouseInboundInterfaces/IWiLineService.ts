import { CreateWiLineDto, UpdateWiLineDto, WiLineDto } from '../../Models/index';
import { ApiResponse, PagedResponse } from '../../Models/ApiResponse';

export interface IWiLineService {
  getAll(): Promise<ApiResponse<WiLineDto[]>>;
  getPaged(pageNumber: number, pageSize: number, sortBy: string, sortDirection: string): Promise<ApiResponse<PagedResponse<WiLineDto>>>;
  getById(id: number): Promise<ApiResponse<WiLineDto>>;
  getByHeaderId(headerId: number): Promise<ApiResponse<WiLineDto[]>>;
  getByStockCode(stockCode: string): Promise<ApiResponse<WiLineDto[]>>;
  getByErpOrderNo(erpOrderNo: string): Promise<ApiResponse<WiLineDto[]>>;
  getByQuantityRange(minQuantity: number, maxQuantity: number): Promise<ApiResponse<WiLineDto[]>>;
  create(createDto: CreateWiLineDto): Promise<ApiResponse<WiLineDto>>;
  update(id: number, updateDto: UpdateWiLineDto): Promise<ApiResponse<WiLineDto>>;
  softDelete(id: number): Promise<ApiResponse<boolean>>;
}
