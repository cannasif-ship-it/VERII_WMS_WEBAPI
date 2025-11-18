import { BaseHeaderEntity, SrtImportLine, SrtLine, SrtTerminalLine } from '../../index';
export interface SrtHeader extends BaseHeaderEntity {
  CustomerCode?: string;
  SourceWarehouse?: string;
  TargetWarehouse?: string;
  Lines: SrtLine[];
  ImportLines: SrtImportLine[];
  TerminalLines: SrtTerminalLine[];
}

