import type { BaseHeaderEntity } from '../BaseHeaderEntity';
export interface SrtHeader extends BaseHeaderEntity {
  CustomerCode?: string;
  SourceWarehouse?: string;
  TargetWarehouse?: string;
  Lines: SrtLine[];
  ImportLines: SrtImportLine[];
  TerminalLines: SrtTerminalLine[];
}

