import { BaseEntity, User, WoHeader } from '../../index';
export interface WoTerminalLine extends BaseEntity {
  HeaderId: number;
  Header: WoHeader;
  TerminalUserId: number;
  User: User;
}

