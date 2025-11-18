import type { BaseRouteUpdateDto } from '../Base/BaseRouteUpdateDto';
import type { BaseRouteEntityDto } from '../Base/BaseRouteEntityDto';
import type { BaseRouteCreateDto } from '../Base/BaseRouteCreateDto';
export interface WoRouteDto extends BaseRouteEntityDto {
  LineId: number;
  StockCode: string;
  RouteCode: string;
  Description?: string;
}

export interface CreateWoRouteDto extends BaseRouteCreateDto {
  LineId: number;
  StockCode: string;
  RouteCode: string;
  Description?: string;
}

export interface UpdateWoRouteDto extends BaseRouteUpdateDto {
  LineId?: number;
  StockCode?: string;
  RouteCode?: string;
  Description?: string;
}

