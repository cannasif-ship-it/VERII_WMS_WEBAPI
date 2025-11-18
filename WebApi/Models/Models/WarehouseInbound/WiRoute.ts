import { BaseRouteEntity, WiImportLine } from '../../index';
export interface WiRoute extends BaseRouteEntity {
  ImportLineId: number;
  ImportLine: WiImportLine;
}

