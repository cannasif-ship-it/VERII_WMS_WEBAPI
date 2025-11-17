import { TransferOpenOrderHeaderDto, TransferOpenOrderLineDto } from '../../Models/index';
import { ApiResponse, PagedResponse } from '../../Models/ApiResponse';

export interface IWtFunctionService {
  getTransferOpenOrderHeader(customerCode: string): Promise<ApiResponse<TransferOpenOrderHeaderDto[]>>;
  getTransferOpenOrderLine(siparisNoCsv: string): Promise<ApiResponse<TransferOpenOrderLineDto[]>>;
}
