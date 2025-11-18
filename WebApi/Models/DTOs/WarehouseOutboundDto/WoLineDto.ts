import type { BaseLineUpdateDto } from '../Base/BaseLineUpdateDto';
import type { BaseLineEntityDto } from '../Base/BaseLineEntityDto';
import type { BaseLineCreateDto } from '../Base/BaseLineCreateDto';
export interface WoLineDto extends BaseLineEntityDto {
  HeaderId: number;
  OrderId?: number;
  ErpLineReference?: string;
}

export interface CreateWoLineDto extends BaseLineCreateDto {
  HeaderId: number;
  OrderId?: number;
  ErpLineReference?: string;
}

export interface UpdateWoLineDto extends BaseLineUpdateDto {
  HeaderId?: number;
  OrderId?: number;
  ErpLineReference?: string;
}

