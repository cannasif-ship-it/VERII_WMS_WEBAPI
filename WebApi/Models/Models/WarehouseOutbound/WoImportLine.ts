import type { WoRoute } from './WoRoute';
import type { WoLine } from './WoLine';
import type { WoHeader } from './WoHeader';
import type { BaseImportLineEntity } from '../BaseImportLineEntity';
export interface WoImportLine extends BaseImportLineEntity {
  HeaderId: number;
  Header: WoHeader;
  LineId?: number;
  Line?: WoLine;
  Routes: WoRoute[];
}

