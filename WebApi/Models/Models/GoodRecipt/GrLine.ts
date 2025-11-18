import type { GrImportLine } from './GrImportLine';
import type { GrHeader } from './GrHeader';
import type { BaseLineEntity } from '../BaseLineEntity';
export interface GrLine extends BaseLineEntity {
  HeaderId: number;
  Header: GrHeader;
  ImportLines: GrImportLine[];
  SerialLines: GrLineSerial[];
}

