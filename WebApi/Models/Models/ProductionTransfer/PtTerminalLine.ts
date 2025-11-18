import { BaseEntity, PtHeader, User } from '../../index';
export interface PtTerminalLine extends BaseEntity {
  HeaderId: number;
  Header: PtHeader;
  TerminalUserId: number;
  User: User;
}

