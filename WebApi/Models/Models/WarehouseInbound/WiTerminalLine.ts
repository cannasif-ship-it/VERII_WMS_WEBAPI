import { BaseEntity, User, WiHeader } from '../../index';
export interface WiTerminalLine extends BaseEntity {
  HeaderId: number;
  Header: WiHeader;
  TerminalUserId: number;
  User: User;
}

