import { BaseHeaderEntity, WiImportLine, WiLine, WiTerminalLine } from '../../index';
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

