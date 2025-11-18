import type { WtTerminalLine } from './WtTerminalLine';
import type { WtLine } from './WtLine';
import type { WtImportLine } from './WtImportLine';
import type { BaseHeaderEntity } from '../BaseHeaderEntity';
export interface WtHeader extends BaseHeaderEntity {
  CustomerCode?: string;
  SourceWarehouse?: string;
  TargetWarehouse?: string;
  ElectronicWaybill: boolean;
  ShipmentId?: number;
  Lines: WtLine[];
  ImportLines: WtImportLine[];
  TerminalLines: WtTerminalLine[];
}

