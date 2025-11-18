import type { SitTerminalLine } from './SitTerminalLine';
import type { SitLine } from './SitLine';
import type { SitImportLine } from './SITImportLine';
import type { BaseHeaderEntity } from '../BaseHeaderEntity';
export interface SitHeader extends BaseHeaderEntity {
  CustomerCode?: string;
  SourceWarehouse?: string;
  TargetWarehouse?: string;
  Lines: SitLine[];
  ImportLines: SitImportLine[];
  TerminalLines: SitTerminalLine[];
}

