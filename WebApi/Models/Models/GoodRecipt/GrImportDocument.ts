import type { GrHeader } from './GrHeader';
import type { BaseEntity } from '../BaseEntity';
export interface GrImportDocument extends BaseEntity {
  HeaderId: number;
  Header: GrHeader;
  Base64: number[];
  ImageUrl?: string;
  FileName?: string;
}

