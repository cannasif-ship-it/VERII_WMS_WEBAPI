import type { BaseRouteUpdateDto } from '../Base/BaseRouteUpdateDto';
import type { BaseRouteEntityDto } from '../Base/BaseRouteEntityDto';
import type { BaseRouteCreateDto } from '../Base/BaseRouteCreateDto';
export interface SitRouteDto extends BaseRouteEntityDto {
  LineId: number;
  StockCode: string;
  RouteCode?: string;
  Priority: number;
  Description?: string;
}

export interface CreateSitRouteDto extends BaseRouteCreateDto {
  LineId: number;
  StockCode: string;
  RouteCode?: string;
  Priority: number;
  Description?: string;
}

export interface UpdateSitRouteDto extends BaseRouteUpdateDto {
  LineId?: number;
  StockCode?: string;
  RouteCode?: string;
  Priority?: number;
  Description?: string;
}

