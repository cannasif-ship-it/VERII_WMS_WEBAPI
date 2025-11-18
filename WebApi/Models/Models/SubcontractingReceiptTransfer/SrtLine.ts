import { BaseLineEntity, SrtHeader, SrtImportLine, SrtLineSerial } from '../../index';
export interface SrtLine extends BaseLineEntity {
  HeaderId: number;
  Header: SrtHeader;
  ImportLines: SrtImportLine[];
  SerialLines: SrtLineSerial[];
}

