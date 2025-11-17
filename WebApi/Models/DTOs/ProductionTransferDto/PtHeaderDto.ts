export interface PtHeaderDto extends BaseHeaderEntityDto {
  CustomerCode?: string;
  SourceWarehouse?: string;
  TargetWarehouse?: string;
}

export interface CreatePtHeaderDto extends BaseHeaderCreateDto {
  CustomerCode?: string;
  SourceWarehouse?: string;
  TargetWarehouse?: string;
}

export interface UpdatePtHeaderDto extends BaseHeaderUpdateDto {
  CustomerCode?: string;
  SourceWarehouse?: string;
  TargetWarehouse?: string;
}

