export interface SrtImportLineDto {
  Id: number;
  HeaderId: number;
  LineId: number;
  RouteId?: number;
  StockCode: string;
  Description1?: string;
  Description2?: string;
  Description?: string;
  CreatedBy?: number;
  CreatedDate: string;
  UpdatedBy?: number;
  UpdatedDate?: string;
  IsDeleted: boolean;
  DeletedBy?: number;
  DeletedDate?: string;
  CreatedByFullUser?: string;
  UpdatedByFullUser?: string;
  DeletedByFullUser?: string;
}

export interface CreateSrtImportLineDto {
  HeaderId: number;
  LineId: number;
  RouteId?: number;
  StockCode: string;
  Description1?: string;
  Description2?: string;
  Description?: string;
}

export interface UpdateSrtImportLineDto {
  HeaderId?: number;
  LineId?: number;
  RouteId?: number;
  StockCode?: string;
  Description1?: string;
  Description2?: string;
  Description?: string;
}

