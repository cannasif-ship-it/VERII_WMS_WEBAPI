import { BaseEntity, MobilemenuHeader } from '../../index';
export interface MobilemenuLine extends BaseEntity {
  ItemId: string;
  Title: string;
  Icon?: string;
  Description?: string;
  HeaderId: number;
  Header: MobilemenuHeader;
}

