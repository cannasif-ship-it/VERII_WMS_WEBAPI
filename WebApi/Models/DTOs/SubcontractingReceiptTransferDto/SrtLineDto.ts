import { BaseLineEntityDto } from '../../index';
export interface SrtLineDto extends BaseLineEntityDto {
  HeaderId: number;
  OrderId?: number;
  ErpLineReference?: string;
}

export interface CreateSrtLineDto {
  HeaderId: number;
  StockCode: string;
  OrderId?: number;
  Quantity: number;
  Unit?: string;
  ErpOrderNo?: string;
  ErpOrderLineNo?: string;
  ErpLineReference?: string;
  Description?: string;
}

export interface UpdateSrtLineDto {
  HeaderId?: number;
  StockCode?: string;
  OrderId?: number;
  Quantity?: number;
  Unit?: string;
  ErpOrderNo?: string;
  ErpOrderLineNo?: string;
  ErpLineReference?: string;
  Description?: string;
}

