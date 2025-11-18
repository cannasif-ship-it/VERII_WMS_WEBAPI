import type { BaseRouteUpdateDto } from '../Base/BaseRouteUpdateDto';
import type { BaseRouteEntityDto } from '../Base/BaseRouteEntityDto';
import type { BaseRouteCreateDto } from '../Base/BaseRouteCreateDto';
export interface WtRouteDto extends BaseRouteEntityDto {
  LineId: number;
  StockCode: string;
  RouteCode?: string;
  Priority: number;
  Description?: string;
}

export interface CreateWtRouteDto extends BaseRouteCreateDto {
  LineId: number;
  StockCode: string;
  RouteCode?: string;
  Priority: number;
  Description?: string;
}

export interface UpdateWtRouteDto extends BaseRouteUpdateDto {
  LineId?: number;
  StockCode?: string;
  RouteCode?: string;
  Priority?: number;
  Description?: string;
}

