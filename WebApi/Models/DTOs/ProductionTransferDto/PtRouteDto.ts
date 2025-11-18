import type { BaseRouteUpdateDto } from '../Base/BaseRouteUpdateDto';
import type { BaseRouteEntityDto } from '../Base/BaseRouteEntityDto';
import type { BaseRouteCreateDto } from '../Base/BaseRouteCreateDto';
export interface PtRouteDto extends BaseRouteEntityDto {
  ImportLineId: number;
}

export interface CreatePtRouteDto extends BaseRouteCreateDto {
  ImportLineId: number;
}

export interface UpdatePtRouteDto extends BaseRouteUpdateDto {
  ImportLineId?: number;
}

