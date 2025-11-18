import { BaseEntity, MobilePageGroup, User } from '../../index';
export interface MobileUserGroupMatch extends BaseEntity {
  UserId: number;
  GroupCode: string;
  Users?: User;
  MobilePageGroups: MobilePageGroup[];
}

