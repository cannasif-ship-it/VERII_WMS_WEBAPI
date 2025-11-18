import { BaseRouteEntity, WtImportLine } from '../../index';
export interface WtRoute extends BaseRouteEntity {
  ImportLineId: number;
  ImportLine: WtImportLine;
}

