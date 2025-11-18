import type { WtHeader } from './WtHeader';
import type { User } from '../User';
import type { BaseEntity } from '../BaseEntity';
export interface WtTerminalLine extends BaseEntity {
  HeaderId: number;
  Header: WtHeader;
  TerminalUserId: number;
  User: User;
}

