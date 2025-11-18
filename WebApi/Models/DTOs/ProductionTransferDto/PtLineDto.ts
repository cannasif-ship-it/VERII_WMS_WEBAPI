import { BaseLineCreateDto, BaseLineEntityDto, BaseLineUpdateDto } from '../../index';
export interface PtLineDto extends BaseLineEntityDto {
  HeaderId: number;
}

export interface CreatePtLineDto extends BaseLineCreateDto {
  HeaderId: number;
}

export interface UpdatePtLineDto extends BaseLineUpdateDto {
  HeaderId?: number;
}

