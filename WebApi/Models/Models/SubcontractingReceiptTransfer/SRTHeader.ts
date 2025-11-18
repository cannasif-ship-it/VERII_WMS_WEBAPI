import type { SrtTerminalLine } from './SrtTerminalLine';
import type { SrtLine } from './SrtLine';
import type { SrtImportLine } from './SRTImportLine';
import type { BaseHeaderEntity } from '../BaseHeaderEntity';
export interface SrtHeader extends BaseHeaderEntity {
  CustomerCode?: string;
  SourceWarehouse?: string;
  TargetWarehouse?: string;
  Lines: SrtLine[];
  ImportLines: SrtImportLine[];
  TerminalLines: SrtTerminalLine[];
}

