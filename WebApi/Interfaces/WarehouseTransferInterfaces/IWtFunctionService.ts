import type { TransferOpenOrderHeaderDto, TransferOpenOrderLineDto } from '../../Models/index';
import type { ApiResponse, PagedResponse } from '../../ApiResponse';

export interface IWtFunctionService {
  getTransferOpenOrderHeader(customerCode: string): Promise<ApiResponse<TransferOpenOrderHeaderDto[]>>;
  getTransferOpenOrderLine(siparisNoCsv: string): Promise<ApiResponse<TransferOpenOrderLineDto[]>>;
}
