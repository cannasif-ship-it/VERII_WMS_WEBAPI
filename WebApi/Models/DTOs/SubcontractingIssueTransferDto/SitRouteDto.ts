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

