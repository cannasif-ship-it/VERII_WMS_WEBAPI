import { BaseEntity } from '../index';
export interface BaseLineEntity extends BaseEntity {
  StockCode: string;
  YapKod?: string;
  Quantity: number;
  Unit?: string;
  ErpOrderNo?: string;
  ErpOrderLineNo?: string;
  Description?: string;
}

