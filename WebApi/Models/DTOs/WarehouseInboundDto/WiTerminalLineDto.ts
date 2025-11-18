import type { BaseEntityDto } from '../Base/BaseEntityDto';
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

