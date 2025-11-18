import type { WiHeader } from './WiHeader';
import type { User } from '../User';
import type { BaseEntity } from '../BaseEntity';
export interface WiTerminalLine extends BaseEntity {
  HeaderId: number;
  Header: WiHeader;
  TerminalUserId: number;
  User: User;
}

