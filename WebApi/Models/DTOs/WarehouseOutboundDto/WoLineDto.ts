import { BaseLineCreateDto, BaseLineEntityDto, BaseLineUpdateDto } from '../../index';
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

