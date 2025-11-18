import type { BaseLineUpdateDto } from '../Base/BaseLineUpdateDto';
import type { BaseLineEntityDto } from '../Base/BaseLineEntityDto';
import type { BaseLineCreateDto } from '../Base/BaseLineCreateDto';
export interface SitLineDto extends BaseLineEntityDto {
  HeaderId: number;
  OrderId?: number;
  ErpLineReference?: string;
}

export interface CreateSitLineDto extends BaseLineCreateDto {
  HeaderId: number;
  OrderId?: number;
  ErpLineReference?: string;
}

export interface UpdateSitLineDto extends BaseLineUpdateDto {
  HeaderId?: number;
  OrderId?: number;
  ErpLineReference?: string;
}

