import type { SitImportLine } from './SITImportLine';
import type { SitHeader } from './SitHeader';
import type { BaseLineEntity } from '../BaseLineEntity';
export interface SitLine extends BaseLineEntity {
  HeaderId: number;
  Header: SitHeader;
  ImportLines: SitImportLine[];
  SerialLines: SitLineSerial[];
}

