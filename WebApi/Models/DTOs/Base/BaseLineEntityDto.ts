import { BaseEntityDto } from '../../index';
export interface BaseLineEntityDto extends BaseEntityDto {
  StockCode: string;
  YapKod?: string;
  Quantity: number;
  Unit?: string;
  ErpOrderNo?: string;
  ErpOrderLineNo?: string;
  Description?: string;
}

