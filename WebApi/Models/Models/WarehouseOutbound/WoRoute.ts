import type { WoImportLine } from './WoImportLine';
import type { BaseRouteEntity } from '../BaseRouteEntity';
export interface WoRoute extends BaseRouteEntity {
  ImportLineId: number;
  ImportLine: WoImportLine;
}

