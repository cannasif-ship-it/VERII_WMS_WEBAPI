import type { BaseEntityDto } from '../Base/BaseEntityDto';
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

