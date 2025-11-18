import type { SrtLine } from './SrtLine';
import type { BaseLineSerialEntity } from '../BaseLineSerialEntity';
export interface SrtLineSerial extends BaseLineSerialEntity {
  LineId: number;
  Line: SrtLine;
}

