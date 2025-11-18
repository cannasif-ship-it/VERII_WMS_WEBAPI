import type { PtLine } from './PtLine';
import type { BaseLineSerialEntity } from '../BaseLineSerialEntity';
export interface PtLineSerial extends BaseLineSerialEntity {
  LineId: number;
  Line: PtLine;
}

