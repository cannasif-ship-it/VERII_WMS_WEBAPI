import type { BaseEntityDto } from '../Base/BaseEntityDto';
export interface IcTerminalLineDto extends BaseEntityDto {
  HeaderId: number;
  TerminalUserId: number;
}

export interface CreateIcTerminalLineDto {
  HeaderId: number;
  TerminalUserId: number;
}

export interface UpdateIcTerminalLineDto {
  HeaderId?: number;
  TerminalUserId?: number;
}

