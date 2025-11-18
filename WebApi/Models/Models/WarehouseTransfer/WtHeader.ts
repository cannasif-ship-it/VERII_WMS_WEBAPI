import { BaseHeaderEntity, WtImportLine, WtLine, WtTerminalLine } from '../../index';
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

