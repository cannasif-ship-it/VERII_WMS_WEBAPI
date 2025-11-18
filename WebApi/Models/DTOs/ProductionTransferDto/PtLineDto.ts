import type { BaseLineUpdateDto } from '../Base/BaseLineUpdateDto';
import type { BaseLineEntityDto } from '../Base/BaseLineEntityDto';
import type { BaseLineCreateDto } from '../Base/BaseLineCreateDto';
export interface PtLineDto extends BaseLineEntityDto {
  HeaderId: number;
}

export interface CreatePtLineDto extends BaseLineCreateDto {
  HeaderId: number;
}

export interface UpdatePtLineDto extends BaseLineUpdateDto {
  HeaderId?: number;
}

