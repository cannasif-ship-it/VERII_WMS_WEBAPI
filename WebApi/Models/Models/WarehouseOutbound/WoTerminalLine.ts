import type { WoHeader } from './WoHeader';
import type { User } from '../User';
import type { BaseEntity } from '../BaseEntity';
export interface WoTerminalLine extends BaseEntity {
  HeaderId: number;
  Header: WoHeader;
  TerminalUserId: number;
  User: User;
}

