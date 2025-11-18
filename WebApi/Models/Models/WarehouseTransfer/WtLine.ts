import { BaseLineEntity, WtHeader, WtImportLine, WtLineSerial } from '../../index';
export interface WtLine extends BaseLineEntity {
  HeaderId: number;
  Header: WtHeader;
  ImportLines: WtImportLine[];
  SerialLines: WtLineSerial[];
}

