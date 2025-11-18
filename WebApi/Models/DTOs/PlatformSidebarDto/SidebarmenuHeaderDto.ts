import type { SidebarmenuLineDto } from './SidebarmenuLineDto';
export interface SidebarmenuHeaderDto {
  Id: number;
  MenuKey: string;
  Title: string;
  Icon?: string;
  Color?: string;
  DarkColor?: string;
  ShadowColor?: string;
  DarkShadowColor?: string;
  TextColor?: string;
  DarkTextColor?: string;
  RoleLevel: number;
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

export interface CreateSidebarmenuHeaderDto {
  MenuKey: string;
  Title: string;
  Icon?: string;
  Color?: string;
  DarkColor?: string;
  ShadowColor?: string;
  DarkShadowColor?: string;
  TextColor?: string;
  DarkTextColor?: string;
  RoleLevel: number;
}

export interface UpdateSidebarmenuHeaderDto {
  MenuKey?: string;
  Title?: string;
  Icon?: string;
  Color?: string;
  DarkColor?: string;
  ShadowColor?: string;
  DarkShadowColor?: string;
  TextColor?: string;
  DarkTextColor?: string;
  RoleLevel?: number;
}

export interface SidebarmenuHeaderWithLinesDto {
  Id: number;
  MenuKey: string;
  Title: string;
  Icon?: string;
  Color?: string;
  DarkColor?: string;
  ShadowColor?: string;
  DarkShadowColor?: string;
  TextColor?: string;
  DarkTextColor?: string;
  RoleLevel: number;
  Lines: SidebarmenuLineDto[];
}

