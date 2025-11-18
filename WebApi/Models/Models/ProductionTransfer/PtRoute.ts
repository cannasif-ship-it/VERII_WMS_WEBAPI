import type { PtImportLine } from './PtImportLine';
import type { BaseRouteEntity } from '../BaseRouteEntity';
export interface PtRoute extends BaseRouteEntity {
  ImportLineId: number;
  ImportLine: PtImportLine;
}

