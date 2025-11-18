import { BaseHeaderEntity, WoImportLine, WoLine, WoTerminalLine } from '../../index';
export interface WoHeader extends BaseHeaderEntity {
  OutboundType: string;
  AccountCode?: string;
  CustomerCode?: string;
  SourceWarehouse?: string;
  TargetWarehouse?: string;
  Type: number;
  Lines: WoLine[];
  ImportLines: WoImportLine[];
  TerminalLines: WoTerminalLine[];
}

