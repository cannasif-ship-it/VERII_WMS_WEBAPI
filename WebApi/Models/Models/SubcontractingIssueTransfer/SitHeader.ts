import { BaseHeaderEntity, SitImportLine, SitLine, SitTerminalLine } from '../../index';
export interface SitHeader extends BaseHeaderEntity {
  CustomerCode?: string;
  SourceWarehouse?: string;
  TargetWarehouse?: string;
  Lines: SitLine[];
  ImportLines: SitImportLine[];
  TerminalLines: SitTerminalLine[];
}

