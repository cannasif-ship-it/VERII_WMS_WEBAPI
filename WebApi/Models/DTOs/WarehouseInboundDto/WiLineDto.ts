import type { BaseLineUpdateDto } from '../Base/BaseLineUpdateDto';
import type { BaseLineEntityDto } from '../Base/BaseLineEntityDto';
import type { BaseLineCreateDto } from '../Base/BaseLineCreateDto';
export interface WiLineDto extends BaseLineEntityDto {
  HeaderId: number;
  OrderId?: number;
  ErpLineReference?: string;
}

export interface CreateWiLineDto extends BaseLineCreateDto {
  HeaderId: number;
  OrderId?: number;
  ErpLineReference?: string;
}

export interface UpdateWiLineDto extends BaseLineUpdateDto {
  HeaderId?: number;
  OrderId?: number;
  ErpLineReference?: string;
}

