import { BaseRouteEntity, WoImportLine } from '../../index';
export interface WoRoute extends BaseRouteEntity {
  ImportLineId: number;
  ImportLine: WoImportLine;
}

