import type { BaseImportLineUpdateDto } from '../Base/BaseImportLineUpdateDto';
import type { BaseImportLineEntityDto } from '../Base/BaseImportLineEntityDto';
import type { BaseImportLineCreateDto } from '../Base/BaseImportLineCreateDto';
export interface WiImportLineDto extends BaseImportLineEntityDto {
  HeaderId: number;
  LineId: number;
  RouteId?: number;
}

export interface CreateWiImportLineDto extends BaseImportLineCreateDto {
  HeaderId: number;
  LineId: number;
  RouteId?: number;
}

export interface UpdateWiImportLineDto extends BaseImportLineUpdateDto {
  HeaderId?: number;
  LineId?: number;
  RouteId?: number;
}

