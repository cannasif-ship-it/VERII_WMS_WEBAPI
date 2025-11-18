import type { WtHeader } from './WtHeader';
import type { BaseImportLineEntity } from '../BaseImportLineEntity';
export interface WtImportLine extends BaseImportLineEntity {
  HeaderId: number;
  Header: WtHeader;
  LineId?: number;
  Line: WtLine;
  Routes: WtRoute[];
}

