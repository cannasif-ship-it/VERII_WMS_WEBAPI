import { BaseHeaderEntity, GrImportLine, GrLine } from '../../index';
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

