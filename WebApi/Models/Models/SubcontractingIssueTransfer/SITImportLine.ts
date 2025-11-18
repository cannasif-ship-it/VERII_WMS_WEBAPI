import { BaseImportLineEntity, SitHeader, SitLine } from '../../index';
export interface SitImportLine extends BaseImportLineEntity {
  HeaderId: number;
  Header: SitHeader;
  LineId?: number;
  Line?: SitLine;
}

