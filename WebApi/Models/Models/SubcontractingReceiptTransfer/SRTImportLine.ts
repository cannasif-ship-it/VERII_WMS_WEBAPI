import { BaseImportLineEntity, SrtHeader, SrtLine } from '../../index';
export interface SrtImportLine extends BaseImportLineEntity {
  HeaderId: number;
  Header: SrtHeader;
  LineId?: number;
  Line?: SrtLine;
}

