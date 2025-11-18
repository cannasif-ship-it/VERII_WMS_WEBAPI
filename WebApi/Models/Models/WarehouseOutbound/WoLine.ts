import { BaseLineEntity, WoHeader, WoImportLine, WoLineSerial } from '../../index';
export interface WoLine extends BaseLineEntity {
  HeaderId: number;
  Header: WoHeader;
  ImportLines: WoImportLine[];
  SerialLines: WoLineSerial[];
}

