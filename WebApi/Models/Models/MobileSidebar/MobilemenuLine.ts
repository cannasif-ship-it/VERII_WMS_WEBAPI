import type { MobilemenuHeader } from './MobilemenuHeader';
import type { BaseEntity } from '../BaseEntity';
export interface MobilemenuLine extends BaseEntity {
  ItemId: string;
  Title: string;
  Icon?: string;
  Description?: string;
  HeaderId: number;
  Header: MobilemenuHeader;
}

