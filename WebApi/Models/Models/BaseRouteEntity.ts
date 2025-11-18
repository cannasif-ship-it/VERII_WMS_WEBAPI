import type { BaseEntity } from './BaseEntity';
export interface BaseRouteEntity extends BaseEntity {
  LineId?: number;
  ScannedBarcode: string;
  Quantity: number;
  StockCode?: string;
  RouteCode?: string;
  Priority?: number;
  Description?: string;
  SerialNo?: string;
  SerialNo2?: string;
  SerialNo3?: string;
  SerialNo4?: string;
  SourceWarehouse?: number;
  TargetWarehouse?: number;
  SourceCellCode?: string;
  TargetCellCode?: string;
}

