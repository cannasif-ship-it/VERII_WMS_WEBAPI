import { BaseEntity, SidebarmenuHeader } from '../../index';
export interface SidebarmenuLine extends BaseEntity {
  HeaderId: number;
  Page: string;
  Title: string;
  Description?: string;
  Icon?: string;
  Header: SidebarmenuHeader;
}

