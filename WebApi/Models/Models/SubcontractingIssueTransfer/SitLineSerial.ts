import type { SitLine } from './SitLine';
import type { BaseLineSerialEntity } from '../BaseLineSerialEntity';
export interface SitLineSerial extends BaseLineSerialEntity {
  LineId: number;
  Line: SitLine;
}

