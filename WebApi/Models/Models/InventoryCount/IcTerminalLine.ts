import { BaseEntity, IcHeader, User } from '../../index';
export interface IcTerminalLine extends BaseEntity {
  HeaderId: number;
  Header: IcHeader;
  TerminalUserId: number;
  User: User;
}

