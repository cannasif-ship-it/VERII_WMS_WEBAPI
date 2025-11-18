import type { SrtLine } from './SrtLine';
import type { SrtHeader } from './SRTHeader';
import type { BaseImportLineEntity } from '../BaseImportLineEntity';
export interface SrtImportLine extends BaseImportLineEntity {
  HeaderId: number;
  Header: SrtHeader;
  LineId?: number;
  Line?: SrtLine;
}

