import type { PtImportLine } from './PtImportLine';
import type { PtHeader } from './PtHeader';
import type { BaseLineEntity } from '../BaseLineEntity';
export interface PtLine extends BaseLineEntity {
  HeaderId: number;
  Header: PtHeader;
  ImportLines: PtImportLine[];
  SerialLines: PtLineSerial[];
}

