import { BaseImportLineEntity, GrHeader, GrLine, GrLineSerial, GrRoute } from '../../index';
export interface GrImportLine extends BaseImportLineEntity {
  HeaderId: number;
  Header: GrHeader;
  LineId?: number;
  Line?: GrLine;
  Routes: GrRoute[];
  SerialLines: GrLineSerial[];
}

