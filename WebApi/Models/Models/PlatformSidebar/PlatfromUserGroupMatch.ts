import { BaseEntity, PlatformPageGroup, User } from '../../index';
export interface PlatformUserGroupMatch extends BaseEntity {
  UserId: number;
  GroupCode: string;
  Users?: User;
  Groups?: PlatformPageGroup;
}

