export interface MobileUserGroupMatchDto {
  Id: number;
  UserId: number;
  GroupCode: string;
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

export interface CreateMobileUserGroupMatchDto {
  UserId: number;
  GroupCode: string;
  CreatedBy?: number;
}

export interface UpdateMobileUserGroupMatchDto {
  UserId?: number;
  GroupCode?: string;
  UpdatedBy?: number;
}

