import type { WiImportLine } from './WiImportLine';
import type { BaseRouteEntity } from '../BaseRouteEntity';
export interface WiRoute extends BaseRouteEntity {
  ImportLineId: number;
  ImportLine: WiImportLine;
}

