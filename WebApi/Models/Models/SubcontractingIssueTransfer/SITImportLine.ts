import type { SitHeader } from './SitHeader';
import type { BaseImportLineEntity } from '../BaseImportLineEntity';
export interface SitImportLine extends BaseImportLineEntity {
  HeaderId: number;
  Header: SitHeader;
  LineId?: number;
  Line?: SitLine;
}

