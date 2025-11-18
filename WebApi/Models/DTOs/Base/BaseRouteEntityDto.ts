import type { BaseEntityDto } from './BaseEntityDto';
export interface BaseRouteEntityDto extends BaseEntityDto {
  ScannedBarcode: string;
  Quantity: number;
  SerialNo?: string;
  SerialNo2?: string;
  SerialNo3?: string;
  SerialNo4?: string;
  SourceWarehouse?: number;
  TargetWarehouse?: number;
  SourceCellCode?: string;
  TargetCellCode?: string;
}

