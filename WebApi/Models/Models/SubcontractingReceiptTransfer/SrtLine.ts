import type { SrtLineSerial } from './SrtLineSerial';
import type { SrtImportLine } from './SRTImportLine';
import type { SrtHeader } from './SRTHeader';
import type { BaseLineEntity } from '../BaseLineEntity';
export interface SrtLine extends BaseLineEntity {
  HeaderId: number;
  Header: SrtHeader;
  ImportLines: SrtImportLine[];
  SerialLines: SrtLineSerial[];
}

