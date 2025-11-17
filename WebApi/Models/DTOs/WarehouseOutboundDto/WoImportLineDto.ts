export interface WoImportLineDto extends BaseImportLineEntityDto {
  HeaderId: number;
  LineId: number;
  RouteId?: number;
}

export interface CreateWoImportLineDto extends BaseImportLineCreateDto {
  HeaderId: number;
  LineId: number;
  RouteId?: number;
}

export interface UpdateWoImportLineDto extends BaseImportLineUpdateDto {
  HeaderId?: number;
  LineId?: number;
  RouteId?: number;
}

