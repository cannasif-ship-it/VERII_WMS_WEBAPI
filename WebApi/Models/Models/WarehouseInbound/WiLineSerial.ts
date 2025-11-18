import type { WiLine } from './WiLine';
import type { BaseLineSerialEntity } from '../BaseLineSerialEntity';
export interface WiLineSerial extends BaseLineSerialEntity {
  LineId: number;
  Line: WiLine;
}

