import type { User } from '../User';
import type { SitHeader } from './SitHeader';
import type { BaseEntity } from '../BaseEntity';
export interface SitTerminalLine extends BaseEntity {
  HeaderId: number;
  Header: SitHeader;
  TerminalUserId: number;
  User: User;
}

