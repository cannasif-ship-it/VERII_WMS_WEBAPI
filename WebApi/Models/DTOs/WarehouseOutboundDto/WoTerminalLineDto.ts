import { BaseEntityDto } from '../../index';
export interface WoTerminalLineDto extends BaseEntityDto {
  HeaderId: number;
  TerminalUserId: number;
}

export interface CreateWoTerminalLineDto {
  HeaderId: number;
  TerminalUserId: number;
}

export interface UpdateWoTerminalLineDto {
  HeaderId?: number;
  TerminalUserId?: number;
}

