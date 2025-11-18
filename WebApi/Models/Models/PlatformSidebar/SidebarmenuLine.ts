import type { SidebarmenuHeader } from './SidebarmenuHeader';
import type { BaseEntity } from '../BaseEntity';
export interface SidebarmenuLine extends BaseEntity {
  HeaderId: number;
  Page: string;
  Title: string;
  Description?: string;
  Icon?: string;
  Header: SidebarmenuHeader;
}

