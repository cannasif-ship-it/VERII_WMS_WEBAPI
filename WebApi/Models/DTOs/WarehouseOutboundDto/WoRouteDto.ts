import { BaseRouteCreateDto, BaseRouteEntityDto, BaseRouteUpdateDto } from '../../index';
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

