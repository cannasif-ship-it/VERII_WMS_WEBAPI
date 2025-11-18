import type { GrImportLine } from './GrImportLine';
import type { BaseLineSerialEntity } from '../BaseLineSerialEntity';
export interface GrLineSerial extends BaseLineSerialEntity {
  ImportLineId: number;
  ImportLine: GrImportLine;
}

