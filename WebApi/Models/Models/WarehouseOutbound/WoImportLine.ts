import { BaseImportLineEntity, WoHeader, WoLine, WoRoute } from '../../index';
export interface WoImportLine extends BaseImportLineEntity {
  HeaderId: number;
  Header: WoHeader;
  LineId?: number;
  Line?: WoLine;
  Routes: WoRoute[];
}

