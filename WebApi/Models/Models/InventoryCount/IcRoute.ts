import type { IcImportLine } from './IcImportLine';
import type { BaseEntity } from '../BaseEntity';
export interface IcRoute extends BaseEntity {
  ImportLineId: number;
  ImportLine: IcImportLine;
  Barcode?: string;
  OldQuantity: number;
  NewQuantity: number;
  SerialNo?: string;
  SerialNo2?: string;
  OldWarehouse?: number;
  NewWarehouse?: number;
  OldCellCode?: string;
  NewCellCode?: string;
  Description?: string;
}

