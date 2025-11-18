import type { BaseImportLineUpdateDto } from '../Base/BaseImportLineUpdateDto';
import type { BaseImportLineEntityDto } from '../Base/BaseImportLineEntityDto';
import type { BaseImportLineCreateDto } from '../Base/BaseImportLineCreateDto';
export interface IcImportLineDto extends BaseImportLineEntityDto {
  HeaderId: number;
}

export interface CreateIcImportLineDto extends BaseImportLineCreateDto {
  HeaderId: number;
}

export interface UpdateIcImportLineDto extends BaseImportLineUpdateDto {
  HeaderId?: number;
}

