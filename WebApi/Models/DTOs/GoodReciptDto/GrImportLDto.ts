import { BaseImportLineCreateDto, BaseImportLineEntityDto, BaseImportLineUpdateDto } from '../../index';
export interface GrImportLDto extends BaseImportLineEntityDto {
  LineId?: number;
  HeaderId: number;
}

export interface CreateGrImportLDto extends BaseImportLineCreateDto {
  LineId?: number;
  HeaderId: number;
}

export interface UpdateGrImportLDto extends BaseImportLineUpdateDto {
  LineId?: number;
  HeaderId?: number;
}

