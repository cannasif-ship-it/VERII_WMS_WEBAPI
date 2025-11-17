export interface WtTerminalLineDto {
  Id: number;
  HeaderId: number;
  TerminalUserId: number;
  CreatedBy?: number;
  UpdatedBy?: number;
  DeletedBy?: number;
  CreatedByFullUser?: string;
  UpdatedByFullUser?: string;
  DeletedByFullUser?: string;
}

export interface CreateWtTerminalLineDto {
  HeaderId: number;
  TerminalUserId: number;
}

export interface UpdateWtTerminalLineDto {
  HeaderId?: number;
  TerminalUserId?: number;
}

