import { BaseLineEntity, WiHeader, WiImportLine, WiLineSerial } from '../../index';
export interface WiLine extends BaseLineEntity {
  HeaderId: number;
  Header: WiHeader;
  ImportLines: WiImportLine[];
  SerialLines: WiLineSerial[];
}

