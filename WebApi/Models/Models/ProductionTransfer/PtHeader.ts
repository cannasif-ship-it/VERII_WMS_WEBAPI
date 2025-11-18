import { BaseHeaderEntity, PtImportLine, PtLine, PtTerminalLine } from '../../index';
export interface PtHeader extends BaseHeaderEntity {
  CustomerCode?: string;
  SourceWarehouse?: string;
  TargetWarehouse?: string;
  Lines: PtLine[];
  ImportLines: PtImportLine[];
  TerminalLines: PtTerminalLine[];
}

