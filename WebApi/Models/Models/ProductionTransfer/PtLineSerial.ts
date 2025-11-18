import { BaseLineSerialEntity, PtLine } from '../../index';
export interface PtLineSerial extends BaseLineSerialEntity {
  LineId: number;
  Line: PtLine;
}

