import { BaseLineEntity, GrHeader, GrImportLine, GrLineSerial } from '../../index';
export interface GrLine extends BaseLineEntity {
  HeaderId: number;
  Header: GrHeader;
  ImportLines: GrImportLine[];
  SerialLines: GrLineSerial[];
}

