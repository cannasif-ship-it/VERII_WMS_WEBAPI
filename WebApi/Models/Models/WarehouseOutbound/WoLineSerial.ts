import type { WoLine } from './WoLine';
import type { BaseLineSerialEntity } from '../BaseLineSerialEntity';
export interface WoLineSerial extends BaseLineSerialEntity {
  LineId: number;
  Line: WoLine;
}

