import type { PtLine } from './PtLine';
import type { PtHeader } from './PtHeader';
import type { BaseImportLineEntity } from '../BaseImportLineEntity';
export interface PtImportLine extends BaseImportLineEntity {
  HeaderId: number;
  Header: PtHeader;
  LineId?: number;
  Line?: PtLine;
}

