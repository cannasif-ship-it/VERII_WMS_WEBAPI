export interface WiImportLineDto extends BaseImportLineEntityDto {
  HeaderId: number;
  LineId: number;
  RouteId?: number;
}

export interface CreateWiImportLineDto extends BaseImportLineCreateDto {
  HeaderId: number;
  LineId: number;
  RouteId?: number;
}

export interface UpdateWiImportLineDto extends BaseImportLineUpdateDto {
  HeaderId?: number;
  LineId?: number;
  RouteId?: number;
}

