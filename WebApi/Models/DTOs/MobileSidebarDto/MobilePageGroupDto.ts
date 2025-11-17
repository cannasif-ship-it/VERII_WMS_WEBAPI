export interface MobilePageGroupDto {
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

export interface CreateMobilePageGroupDto {
  GroupName: string;
  GroupCode: string;
  MenuHeaderId?: number;
  MenuLineId?: number;
  CreatedBy?: number;
}

export interface UpdateMobilePageGroupDto {
  GroupName?: string;
  GroupCode?: string;
  MenuHeaderId?: number;
  MenuLineId?: number;
  UpdatedBy?: number;
}

