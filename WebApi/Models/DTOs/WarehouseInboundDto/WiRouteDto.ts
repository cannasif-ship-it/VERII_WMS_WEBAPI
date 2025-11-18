import type { BaseRouteUpdateDto } from '../Base/BaseRouteUpdateDto';
import type { BaseRouteEntityDto } from '../Base/BaseRouteEntityDto';
import type { BaseRouteCreateDto } from '../Base/BaseRouteCreateDto';
export interface WiRouteDto extends BaseRouteEntityDto {
  LineId: number;
  StockCode: string;
  RouteCode: string;
  Description?: string;
}

export interface CreateWiRouteDto extends BaseRouteCreateDto {
  LineId: number;
  StockCode: string;
  RouteCode: string;
  Description?: string;
}

export interface UpdateWiRouteDto extends BaseRouteUpdateDto {
  LineId?: number;
  StockCode?: string;
  RouteCode?: string;
  Description?: string;
}

