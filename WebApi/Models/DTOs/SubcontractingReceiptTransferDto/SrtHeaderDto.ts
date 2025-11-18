import type { BaseHeaderUpdateDto } from '../Base/BaseHeaderUpdateDto';
import type { BaseHeaderEntityDto } from '../Base/BaseHeaderEntityDto';
import type { BaseHeaderCreateDto } from '../Base/BaseHeaderCreateDto';
export interface SrtHeaderDto extends BaseHeaderEntityDto {
  CustomerCode?: string;
  SourceWarehouse?: string;
  TargetWarehouse?: string;
  Type: number;
}

export interface CreateSrtHeaderDto extends BaseHeaderCreateDto {
  CustomerCode?: string;
  SourceWarehouse?: string;
  TargetWarehouse?: string;
  Type: number;
}

export interface UpdateSrtHeaderDto extends BaseHeaderUpdateDto {
  CustomerCode?: string;
  SourceWarehouse?: string;
  TargetWarehouse?: string;
  Type?: number;
}

