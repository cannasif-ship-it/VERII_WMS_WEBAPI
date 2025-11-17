import { GoodsOpenOrdersHeaderDto, GoodsOpenOrdersLineDto } from '../../Models/index';
import { ApiResponse, PagedResponse } from '../../Models/ApiResponse';

export interface IGoodReciptFunctionsService {
  getGoodsReceiptHeader(customerCode: string): Promise<ApiResponse<GoodsOpenOrdersHeaderDto[]>>;
  getGoodsReceiptLine(siparisNoCsv: string): Promise<ApiResponse<GoodsOpenOrdersLineDto[]>>;
}
