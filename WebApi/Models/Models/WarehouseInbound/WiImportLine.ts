import type { WiHeader } from './WiHeader';
import type { BaseImportLineEntity } from '../BaseImportLineEntity';
export interface WiImportLine extends BaseImportLineEntity {
  HeaderId: number;
  Header: WiHeader;
  LineId?: number;
  Line?: WiLine;
}

