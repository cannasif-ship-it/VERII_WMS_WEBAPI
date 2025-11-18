import type { GrImportLine } from './GrImportLine';
import type { BaseRouteEntity } from '../BaseRouteEntity';
export interface GrRoute extends BaseRouteEntity {
  ImportLineId: number;
  ImportLine: GrImportLine;
}

