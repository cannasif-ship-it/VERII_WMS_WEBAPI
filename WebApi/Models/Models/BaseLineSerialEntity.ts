import type { BaseEntity } from './BaseEntity';
export interface BaseLineSerialEntity extends BaseEntity {
  Quantity: number;
  SerialNo?: string;
  SerialNo2?: string;
  SerialNo3?: string;
  SerialNo4?: string;
  SourceCellCode?: string;
  TargetCellCode?: string;
}

