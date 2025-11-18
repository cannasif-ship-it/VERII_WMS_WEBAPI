export interface AddWtImportBarcodeRequestDto {
  HeaderId: number;
  LineId?: number;
  Barcode: string;
  StockCode: string;
  YapKod?: string;
  Quantity: number;
  SerialNo?: string;
  SerialNo2?: string;
  SerialNo3?: string;
  SerialNo4?: string;
  SourceCellCode?: string;
  TargetCellCode?: string;
}

