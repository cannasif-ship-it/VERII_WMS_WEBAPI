import type { MobilemenuLine } from './MobilemenuLine';
import type { MobilemenuHeader } from './MobilemenuHeader';
import type { BaseEntity } from '../BaseEntity';
export interface MobilePageGroup extends BaseEntity {
  GroupName: string;
  GroupCode: string;
  MenuHeaderId?: number;
  MenuHeaders?: MobilemenuHeader;
  MenuLineId?: number;
  MenuLines?: MobilemenuLine;
  UserGroupMatches: MobileUserGroupMatch[];
}

