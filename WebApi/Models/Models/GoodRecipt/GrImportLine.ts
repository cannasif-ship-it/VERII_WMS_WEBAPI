import type { GrHeader } from './GrHeader';
import type { BaseImportLineEntity } from '../BaseImportLineEntity';
export interface GrImportLine extends BaseImportLineEntity {
  HeaderId: number;
  Header: GrHeader;
  LineId?: number;
  Line?: GrLine;
  Routes: GrRoute[];
  SerialLines: GrLineSerial[];
}

