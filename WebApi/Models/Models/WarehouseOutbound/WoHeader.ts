import type { WoTerminalLine } from './WoTerminalLine';
import type { WoLine } from './WoLine';
import type { WoImportLine } from './WoImportLine';
import type { BaseHeaderEntity } from '../BaseHeaderEntity';
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

