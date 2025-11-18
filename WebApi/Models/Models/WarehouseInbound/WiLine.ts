import type { WiLineSerial } from './WiLineSerial';
import type { WiImportLine } from './WiImportLine';
import type { WiHeader } from './WiHeader';
import type { BaseLineEntity } from '../BaseLineEntity';
export interface WiLine extends BaseLineEntity {
  HeaderId: number;
  Header: WiHeader;
  ImportLines: WiImportLine[];
  SerialLines: WiLineSerial[];
}

