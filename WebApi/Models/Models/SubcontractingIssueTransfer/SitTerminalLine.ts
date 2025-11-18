import { BaseEntity, SitHeader, User } from '../../index';
export interface SitTerminalLine extends BaseEntity {
  HeaderId: number;
  Header: SitHeader;
  TerminalUserId: number;
  User: User;
}

