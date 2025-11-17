export interface PtTerminalLineDto {
  Id: number;
  HeaderId: number;
  TerminalUserId: number;
  CreatedBy?: number;
  UpdatedBy?: number;
  DeletedBy?: number;
  CreatedDate: string;
  UpdatedDate?: string;
  DeletedDate?: string;
  IsDeleted: boolean;
  CreatedByFullUser?: string;
  UpdatedByFullUser?: string;
  DeletedByFullUser?: string;
}

export interface CreatePtTerminalLineDto {
  HeaderId: number;
  TerminalUserId: number;
}

export interface UpdatePtTerminalLineDto {
  HeaderId?: number;
  TerminalUserId?: number;
}

