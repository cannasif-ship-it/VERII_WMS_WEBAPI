export interface GrLineDto extends BaseLineEntityDto {
  HeaderId: number;
  OrderId?: number;
}

export interface CreateGrLineDto extends BaseLineCreateDto {
  HeaderId: number;
  OrderId?: number;
}

export interface UpdateGrLineDto extends BaseLineUpdateDto {
  HeaderId: number;
  OrderId?: number;
}

