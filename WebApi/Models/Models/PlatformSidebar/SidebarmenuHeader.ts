import type { BaseEntity } from '../BaseEntity';
export interface SidebarmenuHeader extends BaseEntity {
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
  Lines: SidebarmenuLine[];
}

