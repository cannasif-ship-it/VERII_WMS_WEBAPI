import type { PtTerminalLine } from './PtTerminalLine';
import type { PtLine } from './PtLine';
import type { PtImportLine } from './PtImportLine';
import type { BaseHeaderEntity } from '../BaseHeaderEntity';
export interface PtHeader extends BaseHeaderEntity {
  CustomerCode?: string;
  SourceWarehouse?: string;
  TargetWarehouse?: string;
  Lines: PtLine[];
  ImportLines: PtImportLine[];
  TerminalLines: PtTerminalLine[];
}

