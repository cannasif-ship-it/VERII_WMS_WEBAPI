import { BaseEntity, MobilemenuHeader, MobilemenuLine, MobileUserGroupMatch } from '../../index';
export interface MobilePageGroup extends BaseEntity {
  GroupName: string;
  GroupCode: string;
  MenuHeaderId?: number;
  MenuHeaders?: MobilemenuHeader;
  MenuLineId?: number;
  MenuLines?: MobilemenuLine;
  UserGroupMatches: MobileUserGroupMatch[];
}

