import type { SitImportLine } from './SITImportLine';
import type { BaseRouteEntity } from '../BaseRouteEntity';
export interface SitRoute extends BaseRouteEntity {
  ImportLineId: number;
  ImportLine: SitImportLine;
}

