export interface MobilemenuHeaderDto {
  Id: number;
  MenuId: string;
  Title: string;
  Icon?: string;
  IsOpen: boolean;
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

export interface CreateMobilemenuHeaderDto {
  MenuId: string;
  Title: string;
  Icon?: string;
  IsOpen: boolean;
  CreatedBy?: string;
}

export interface UpdateMobilemenuHeaderDto {
  MenuId?: string;
  Title?: string;
  Icon?: string;
  IsOpen?: boolean;
  UpdatedBy?: string;
}

