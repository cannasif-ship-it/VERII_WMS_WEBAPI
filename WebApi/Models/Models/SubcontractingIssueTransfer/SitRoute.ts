import { BaseRouteEntity, SitImportLine } from '../../index';
export interface SitRoute extends BaseRouteEntity {
  ImportLineId: number;
  ImportLine: SitImportLine;
}

