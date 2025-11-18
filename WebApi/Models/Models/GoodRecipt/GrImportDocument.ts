import { BaseEntity, GrHeader } from '../../index';
export interface GrImportDocument extends BaseEntity {
  HeaderId: number;
  Header: GrHeader;
  Base64: number[];
  ImageUrl?: string;
  FileName?: string;
}

