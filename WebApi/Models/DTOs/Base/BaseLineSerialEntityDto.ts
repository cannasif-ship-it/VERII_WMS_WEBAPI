import { BaseEntityDto } from '../../index';
export interface BaseLineSerialEntityDto extends BaseEntityDto {
  Quantity: number;
  SerialNo?: string;
  SerialNo2?: string;
  SerialNo3?: string;
  SerialNo4?: string;
  SourceCellCode?: string;
  TargetCellCode?: string;
}

