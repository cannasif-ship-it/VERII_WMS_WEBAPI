import { BaseEntityDto } from '../../index';
export interface WiTerminalLineDto extends BaseEntityDto {
  HeaderId: number;
  TerminalUserId: number;
}

export interface CreateWiTerminalLineDto {
  HeaderId: number;
  TerminalUserId: number;
}

export interface UpdateWiTerminalLineDto {
  HeaderId?: number;
  TerminalUserId?: number;
}

