import { BaseLineSerialEntity, WtLine } from '../../index';
export interface WtLineSerial extends BaseLineSerialEntity {
  LineId: number;
  Line: WtLine;
}

