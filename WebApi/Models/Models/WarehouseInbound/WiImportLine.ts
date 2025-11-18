import { BaseImportLineEntity, WiHeader, WiLine } from '../../index';
export interface WiImportLine extends BaseImportLineEntity {
  HeaderId: number;
  Header: WiHeader;
  LineId?: number;
  Line?: WiLine;
}

