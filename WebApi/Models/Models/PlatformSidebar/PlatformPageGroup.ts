import type { SidebarmenuLine } from './SidebarmenuLine';
import type { SidebarmenuHeader } from './SidebarmenuHeader';
import type { BaseEntity } from '../BaseEntity';
export interface PlatformPageGroup extends BaseEntity {
  GroupName: string;
  GroupCode: string;
  MenuHeaderId?: number;
  MenuHeaders?: SidebarmenuHeader;
  MenuLineId?: number;
  MenuLines?: SidebarmenuLine;
}

