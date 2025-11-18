import { BaseRouteCreateDto, BaseRouteEntityDto, BaseRouteUpdateDto } from '../../index';
export interface PtRouteDto extends BaseRouteEntityDto {
  ImportLineId: number;
}

export interface CreatePtRouteDto extends BaseRouteCreateDto {
  ImportLineId: number;
}

export interface UpdatePtRouteDto extends BaseRouteUpdateDto {
  ImportLineId?: number;
}

