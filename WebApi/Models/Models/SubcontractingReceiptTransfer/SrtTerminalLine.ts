import { BaseEntity, SrtHeader, User } from '../../index';
export interface SrtTerminalLine extends BaseEntity {
  HeaderId: number;
  Header: SrtHeader;
  TerminalUserId: number;
  User: User;
}

