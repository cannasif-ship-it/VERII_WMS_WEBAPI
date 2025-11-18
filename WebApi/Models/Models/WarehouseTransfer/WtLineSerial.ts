import type { WtLine } from './WtLine';
import type { BaseLineSerialEntity } from '../BaseLineSerialEntity';
export interface WtLineSerial extends BaseLineSerialEntity {
  LineId: number;
  Line: WtLine;
}

