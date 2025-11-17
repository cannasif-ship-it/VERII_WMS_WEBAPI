export interface SidebarmenuLineDto {
  Id: number;
  HeaderId: number;
  Page: string;
  Title: string;
  Description?: string;
  Icon?: string;
  CreatedDate?: string;
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

export interface CreateSidebarmenuLineDto {
  HeaderId: number;
  Page: string;
  Title: string;
  Description?: string;
  Icon?: string;
}

export interface UpdateSidebarmenuLineDto {
  HeaderId?: number;
  Page?: string;
  Title?: string;
  Description?: string;
  Icon?: string;
}

