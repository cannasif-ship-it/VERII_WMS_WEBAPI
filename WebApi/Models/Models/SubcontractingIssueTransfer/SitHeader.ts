import type { BaseHeaderEntity } from '../BaseHeaderEntity';
export interface SitHeader extends BaseHeaderEntity {
  CustomerCode?: string;
  SourceWarehouse?: string;
  TargetWarehouse?: string;
  Lines: SitLine[];
  ImportLines: SitImportLine[];
  TerminalLines: SitTerminalLine[];
}

