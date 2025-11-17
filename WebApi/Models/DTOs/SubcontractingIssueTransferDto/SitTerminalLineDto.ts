export interface SitTerminalLineDto extends BaseEntityDto {
  HeaderId: number;
  TerminalUserId: number;
}

export interface CreateSitTerminalLineDto {
  HeaderId: number;
  TerminalUserId: number;
}

export interface UpdateSitTerminalLineDto {
  HeaderId?: number;
  TerminalUserId?: number;
}

