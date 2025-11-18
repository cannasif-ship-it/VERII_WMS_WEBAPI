import { BaseRouteEntity, GrImportLine } from '../../index';
export interface GrRoute extends BaseRouteEntity {
  ImportLineId: number;
  ImportLine: GrImportLine;
}

