import { BaseEntity, SidebarmenuHeader, SidebarmenuLine } from '../../index';
export interface PlatformPageGroup extends BaseEntity {
  GroupName: string;
  GroupCode: string;
  MenuHeaderId?: number;
  MenuHeaders?: SidebarmenuHeader;
  MenuLineId?: number;
  MenuLines?: SidebarmenuLine;
}

