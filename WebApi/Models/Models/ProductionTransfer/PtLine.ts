import { BaseLineEntity, PtHeader, PtImportLine, PtLineSerial } from '../../index';
export interface PtLine extends BaseLineEntity {
  HeaderId: number;
  Header: PtHeader;
  ImportLines: PtImportLine[];
  SerialLines: PtLineSerial[];
}

