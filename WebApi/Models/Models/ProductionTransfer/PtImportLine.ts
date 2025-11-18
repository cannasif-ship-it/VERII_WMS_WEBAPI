import { BaseImportLineEntity, PtHeader, PtLine } from '../../index';
export interface PtImportLine extends BaseImportLineEntity {
  HeaderId: number;
  Header: PtHeader;
  LineId?: number;
  Line?: PtLine;
}

