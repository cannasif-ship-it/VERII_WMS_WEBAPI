export interface PtImportLineDto extends BaseImportLineEntityDto {
  HeaderId: number;
  LineId: number;
}

export interface CreatePtImportLineDto extends BaseImportLineCreateDto {
  HeaderId: number;
  LineId: number;
}

export interface UpdatePtImportLineDto extends BaseImportLineUpdateDto {
  HeaderId?: number;
  LineId?: number;
}

