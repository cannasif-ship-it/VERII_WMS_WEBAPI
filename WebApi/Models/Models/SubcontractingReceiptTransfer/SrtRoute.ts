import type { SrtImportLine } from './SRTImportLine';
import type { BaseRouteEntity } from '../BaseRouteEntity';
export interface SrtRoute extends BaseRouteEntity {
  ImportLineId: number;
  ImportLine: SrtImportLine;
}

