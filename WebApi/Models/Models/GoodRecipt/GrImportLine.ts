import type { GrRoute } from './GrRoute';
import type { GrLineSerial } from './GrLineSerial';
import type { GrLine } from './GrLine';
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

