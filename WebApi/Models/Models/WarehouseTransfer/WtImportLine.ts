import { BaseImportLineEntity, WtHeader, WtLine, WtRoute } from '../../index';
export interface WtImportLine extends BaseImportLineEntity {
  HeaderId: number;
  Header: WtHeader;
  LineId?: number;
  Line: WtLine;
  Routes: WtRoute[];
}

