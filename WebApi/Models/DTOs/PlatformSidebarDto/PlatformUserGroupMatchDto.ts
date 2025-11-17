export interface PlatformUserGroupMatchDto {
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

export interface CreatePlatformUserGroupMatchDto {
  UserId: number;
  GroupCode: string;
}

export interface UpdatePlatformUserGroupMatchDto {
  UserId?: number;
  GroupCode?: string;
}

