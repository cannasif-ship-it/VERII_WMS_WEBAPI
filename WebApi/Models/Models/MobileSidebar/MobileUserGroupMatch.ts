import type { User } from '../User';
import type { MobilePageGroup } from './MobilePageGroup';
import type { BaseEntity } from '../BaseEntity';
export interface MobileUserGroupMatch extends BaseEntity {
  UserId: number;
  GroupCode: string;
  Users?: User;
  MobilePageGroups: MobilePageGroup[];
}

