import { BaseEntityDto } from '../../index';
export interface GrImportDocumentDto extends BaseEntityDto {
  HeaderId: number;
  Base64: number[];
}

export interface CreateGrImportDocumentDto {
  HeaderId: number;
  Base64: number[];
}

export interface UpdateGrImportDocumentDto {
  HeaderId: number;
  Base64: number[];
}

