export interface UserAuthorityDto {
  Id: number;
  Title: string;
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

export interface CreateUserAuthorityDto {
  Title: string;
}

export interface UpdateUserAuthorityDto {
  Title: string;
}

