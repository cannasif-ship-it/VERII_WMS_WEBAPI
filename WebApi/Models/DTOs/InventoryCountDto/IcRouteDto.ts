export interface IcRouteDto extends BaseRouteEntityDto {
  ImportLineId: number;
  RouteCode: string;
  Priority: number;
  Description?: string;
}

export interface CreateIcRouteDto extends BaseRouteCreateDto {
  ImportLineId: number;
  RouteCode: string;
  Priority: number;
  Description?: string;
}

export interface UpdateIcRouteDto extends BaseRouteUpdateDto {
  ImportLineId?: number;
  RouteCode?: string;
  Priority?: number;
  Description?: string;
}

