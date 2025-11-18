import type { WtImportLine } from './WtImportLine';
import type { BaseRouteEntity } from '../BaseRouteEntity';
export interface WtRoute extends BaseRouteEntity {
  ImportLineId: number;
  ImportLine: WtImportLine;
}

