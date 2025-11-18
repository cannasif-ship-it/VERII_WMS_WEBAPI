import { BaseEntity, MobilemenuLine } from '../../index';
export interface MobilemenuHeader extends BaseEntity {
  MenuId: string;
  Title: string;
  Icon?: string;
  IsOpen: boolean;
  Lines: MobilemenuLine[];
}

