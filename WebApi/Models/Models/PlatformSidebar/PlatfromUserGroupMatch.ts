import type { User } from '../User';
import type { PlatformPageGroup } from './PlatformPageGroup';
import type { BaseEntity } from '../BaseEntity';
export interface PlatformUserGroupMatch extends BaseEntity {
  UserId: number;
  GroupCode: string;
  Users?: User;
  Groups?: PlatformPageGroup;
}

