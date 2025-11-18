import { BaseEntityDto } from '../../index';
export interface SrtTerminalLineDto extends BaseEntityDto {
  HeaderId: number;
  TerminalUserId: number;
}

export interface CreateSrtTerminalLineDto {
  HeaderId: number;
  TerminalUserId: number;
}

export interface UpdateSrtTerminalLineDto {
  HeaderId?: number;
  TerminalUserId?: number;
}

