import type { WoImportLine } from './WoImportLine';
import type { WoHeader } from './WoHeader';
import type { BaseLineEntity } from '../BaseLineEntity';
export interface WoLine extends BaseLineEntity {
  HeaderId: number;
  Header: WoHeader;
  ImportLines: WoImportLine[];
  SerialLines: WoLineSerial[];
}

