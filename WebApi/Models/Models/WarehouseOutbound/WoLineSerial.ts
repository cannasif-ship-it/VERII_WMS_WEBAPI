import { BaseLineSerialEntity, WoLine } from '../../index';
export interface WoLineSerial extends BaseLineSerialEntity {
  LineId: number;
  Line: WoLine;
}

