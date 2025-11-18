import type { BaseImportLineUpdateDto } from '../Base/BaseImportLineUpdateDto';
import type { BaseImportLineEntityDto } from '../Base/BaseImportLineEntityDto';
import type { BaseImportLineCreateDto } from '../Base/BaseImportLineCreateDto';
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

