import { BaseRouteCreateDto, BaseRouteEntityDto, BaseRouteUpdateDto } from '../../index';
export interface SrtRouteDto extends BaseRouteEntityDto {
  LineId: number;
  StockCode: string;
  RouteCode?: string;
  Priority: number;
  Description?: string;
}

export interface CreateSrtRouteDto extends BaseRouteCreateDto {
  LineId: number;
  StockCode: string;
  RouteCode?: string;
  Priority: number;
  Description?: string;
}

export interface UpdateSrtRouteDto extends BaseRouteUpdateDto {
  LineId?: number;
  StockCode?: string;
  RouteCode?: string;
  Priority?: number;
  Description?: string;
}

