import { BaseRouteEntity, PtImportLine } from '../../index';
export interface PtRoute extends BaseRouteEntity {
  ImportLineId: number;
  ImportLine: PtImportLine;
}

