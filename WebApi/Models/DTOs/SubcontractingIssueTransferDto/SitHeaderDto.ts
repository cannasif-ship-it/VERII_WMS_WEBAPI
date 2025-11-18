import type { BaseHeaderUpdateDto } from '../Base/BaseHeaderUpdateDto';
import type { BaseHeaderEntityDto } from '../Base/BaseHeaderEntityDto';
import type { BaseHeaderCreateDto } from '../Base/BaseHeaderCreateDto';
export interface SitHeaderDto extends BaseHeaderEntityDto {
  DocumentNo: string;
  DocumentDate: string;
  CustomerCode?: string;
  SourceWarehouse?: string;
  TargetWarehouse?: string;
  Priority?: string;
  Type: number;
}

export interface CreateSitHeaderDto extends BaseHeaderCreateDto {
  DocumentNo: string;
  DocumentDate: string;
  CustomerCode?: string;
  SourceWarehouse?: string;
  TargetWarehouse?: string;
  Priority?: string;
  Type: number;
}

export interface UpdateSitHeaderDto extends BaseHeaderUpdateDto {
  DocumentNo?: string;
  DocumentDate?: string;
  CustomerCode?: string;
  SourceWarehouse?: string;
  TargetWarehouse?: string;
  Priority?: string;
  Type?: number;
}

