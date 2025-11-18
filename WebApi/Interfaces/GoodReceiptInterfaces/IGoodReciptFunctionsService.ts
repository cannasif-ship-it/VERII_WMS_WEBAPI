import type { GoodsOpenOrdersHeaderDto, GoodsOpenOrdersLineDto } from '../../Models/index';
import type { ApiResponse, PagedResponse } from '../../ApiResponse';

export interface IGoodReciptFunctionsService {
  getGoodsReceiptHeader(customerCode: string): Promise<ApiResponse<GoodsOpenOrdersHeaderDto[]>>;
  getGoodsReceiptLine(siparisNoCsv: string): Promise<ApiResponse<GoodsOpenOrdersLineDto[]>>;
}
