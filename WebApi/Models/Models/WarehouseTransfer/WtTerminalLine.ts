import { BaseEntity, User, WtHeader } from '../../index';
export interface WtTerminalLine extends BaseEntity {
  HeaderId: number;
  Header: WtHeader;
  TerminalUserId: number;
  User: User;
}

