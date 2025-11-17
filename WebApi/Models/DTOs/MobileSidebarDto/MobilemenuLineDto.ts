export interface MobilemenuLineDto {
  Id: number;
  HeaderId: number;
  MenuName: string;
  MenuCode: string;
  MenuIcon?: string;
  MenuUrl?: string;
  OrderNo?: number;
  IsActive: boolean;
  CreatedDate: string;
  UpdatedDate?: string;
  DeletedDate?: string;
  IsDeleted: boolean;
  CreatedBy?: number;
  UpdatedBy?: number;
  DeletedBy?: number;
  CreatedByFullUser?: string;
  UpdatedByFullUser?: string;
  DeletedByFullUser?: string;
}

export interface CreateMobilemenuLineDto {
  ItemId: string;
  Title: string;
  Icon?: string;
  Description?: string;
  HeaderId: number;
  CreatedBy?: string;
}

export interface UpdateMobilemenuLineDto {
  ItemId?: string;
  Title?: string;
  Icon?: string;
  Description?: string;
  HeaderId?: number;
  UpdatedBy?: string;
}

