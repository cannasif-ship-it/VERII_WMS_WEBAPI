import type { BaseImportLineUpdateDto } from '../Base/BaseImportLineUpdateDto';
import type { BaseImportLineEntityDto } from '../Base/BaseImportLineEntityDto';
import type { BaseImportLineCreateDto } from '../Base/BaseImportLineCreateDto';
export interface SitImportLineDto extends BaseImportLineEntityDto {
  HeaderId: number;
  LineId: number;
  RouteId?: number;
}

export interface CreateSitImportLineDto extends BaseImportLineCreateDto {
  HeaderId: number;
  LineId: number;
  RouteId?: number;
}

export interface UpdateSitImportLineDto extends BaseImportLineUpdateDto {
  HeaderId?: number;
  LineId?: number;
  RouteId?: number;
}

