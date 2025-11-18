import type { User } from '../User';
import type { PtHeader } from './PtHeader';
import type { BaseEntity } from '../BaseEntity';
export interface PtTerminalLine extends BaseEntity {
  HeaderId: number;
  Header: PtHeader;
  TerminalUserId: number;
  User: User;
}

