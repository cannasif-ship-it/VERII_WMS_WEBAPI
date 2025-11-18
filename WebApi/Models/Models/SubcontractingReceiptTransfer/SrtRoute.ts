import { BaseRouteEntity, SrtImportLine } from '../../index';
export interface SrtRoute extends BaseRouteEntity {
  ImportLineId: number;
  ImportLine: SrtImportLine;
}

