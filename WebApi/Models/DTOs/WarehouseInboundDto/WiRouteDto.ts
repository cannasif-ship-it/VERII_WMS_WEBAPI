import { BaseRouteCreateDto, BaseRouteEntityDto, BaseRouteUpdateDto } from '../../index';
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

