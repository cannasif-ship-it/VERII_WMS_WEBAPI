import type { User } from '../User';
import type { SrtHeader } from './SRTHeader';
import type { BaseEntity } from '../BaseEntity';
export interface SrtTerminalLine extends BaseEntity {
  HeaderId: number;
  Header: SrtHeader;
  TerminalUserId: number;
  User: User;
}

