import type { BaseHeaderEntity } from '../BaseHeaderEntity';
export interface IcHeader extends BaseHeaderEntity {
  WarehouseCode?: string;
  ProductCode?: string;
  CellCode?: string;
  Type: number;
  TerminalLines: IcTerminalLine[];
  ImportLines: IcImportLine[];
}

