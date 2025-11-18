import type { GrLine } from './GrLine';
import type { GrImportLine } from './GrImportLine';
import type { BaseHeaderEntity } from '../BaseHeaderEntity';
export interface GrHeader extends BaseHeaderEntity {
  CustomerCode: string;
  ElectronicWaybill: boolean;
  ReturnCode: boolean;
  OCRSource: boolean;
  Description3?: string;
  Description4?: string;
  Description5?: string;
  Lines: GrLine[];
  ImportLines: GrImportLine[];
}

