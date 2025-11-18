import type { BaseHeaderEntity } from '../BaseHeaderEntity';
export interface PtHeader extends BaseHeaderEntity {
  CustomerCode?: string;
  SourceWarehouse?: string;
  TargetWarehouse?: string;
  Lines: PtLine[];
  ImportLines: PtImportLine[];
  TerminalLines: PtTerminalLine[];
}

