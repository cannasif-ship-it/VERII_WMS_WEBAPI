export interface PlatformPageGroupDto {
  Id: number;
  GroupName: string;
  GroupCode: string;
  MenuHeaderId?: number;
  MenuLineId?: number;
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

export interface CreatePlatformPageGroupDto {
  GroupName: string;
  GroupCode: string;
  MenuHeaderId?: number;
  MenuLineId?: number;
}

export interface UpdatePlatformPageGroupDto {
  GroupName?: string;
  GroupCode?: string;
  MenuHeaderId?: number;
  MenuLineId?: number;
}

