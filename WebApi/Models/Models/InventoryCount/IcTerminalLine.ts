import type { User } from '../User';
import type { IcHeader } from './IcHeader';
import type { BaseEntity } from '../BaseEntity';
export interface IcTerminalLine extends BaseEntity {
  HeaderId: number;
  Header: IcHeader;
  TerminalUserId: number;
  User: User;
}

