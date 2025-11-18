import type { WtLineSerial } from './WtLineSerial';
import type { WtImportLine } from './WtImportLine';
import type { WtHeader } from './WtHeader';
import type { BaseLineEntity } from '../BaseLineEntity';
export interface WtLine extends BaseLineEntity {
  HeaderId: number;
  Header: WtHeader;
  ImportLines: WtImportLine[];
  SerialLines: WtLineSerial[];
}

