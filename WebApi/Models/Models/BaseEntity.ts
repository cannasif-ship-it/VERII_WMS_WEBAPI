export interface BaseEntity {
  Id: number;
  CreatedDate?: string;
  UpdatedDate?: string;
  DeletedDate?: string;
  IsDeleted: boolean;
  CreatedBy?: number;
  CreatedByUser?: User;
  UpdatedBy?: number;
  UpdatedByUser?: User;
  DeletedBy?: number;
  DeletedByUser?: User;
}

