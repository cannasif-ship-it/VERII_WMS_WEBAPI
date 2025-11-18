import { BaseLineSerialEntity, GrImportLine } from '../../index';
export interface GrLineSerial extends BaseLineSerialEntity {
  ImportLineId: number;
  ImportLine: GrImportLine;
}

