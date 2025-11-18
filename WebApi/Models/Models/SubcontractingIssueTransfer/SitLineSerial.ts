import { BaseLineSerialEntity, SitLine } from '../../index';
export interface SitLineSerial extends BaseLineSerialEntity {
  LineId: number;
  Line: SitLine;
}

