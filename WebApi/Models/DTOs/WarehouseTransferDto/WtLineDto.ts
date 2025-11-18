import type { BaseLineUpdateDto } from '../Base/BaseLineUpdateDto';
import type { BaseLineEntityDto } from '../Base/BaseLineEntityDto';
import type { BaseLineCreateDto } from '../Base/BaseLineCreateDto';
export interface WtLineDto extends BaseLineEntityDto {
  HeaderId: number;
  OrderId?: number;
  ErpLineReference?: string;
}

export interface CreateWtLineDto extends BaseLineCreateDto {
  HeaderId: number;
  OrderId?: number;
  ErpLineReference?: string;
}

export interface UpdateWtLineDto extends BaseLineUpdateDto {
  HeaderId?: number;
  OrderId?: number;
  ErpLineReference?: string;
}

