import type { WiTerminalLine } from './WiTerminalLine';
import type { WiLine } from './WiLine';
import type { WiImportLine } from './WiImportLine';
import type { BaseHeaderEntity } from '../BaseHeaderEntity';
export interface WiHeader extends BaseHeaderEntity {
  InboundType: string;
  AccountCode?: string;
  CustomerCode?: string;
  SourceWarehouse?: string;
  TargetWarehouse?: string;
  Lines: WiLine[];
  ImportLines: WiImportLine[];
  TerminalLines: WiTerminalLine[];
}

