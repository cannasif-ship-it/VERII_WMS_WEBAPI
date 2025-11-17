export interface BaseLineCreateDto {
  StockCode: string;
  Quantity: number;
  Unit?: string;
  ErpOrderNo?: string;
  ErpOrderLineNo?: string;
  Description?: string;
}

