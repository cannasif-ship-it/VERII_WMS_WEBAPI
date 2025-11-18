import type { BaseEntity } from './BaseEntity';
export interface User extends BaseEntity {
  Username: string;
  Email: string;
  PasswordHash: string;
  FirstName?: string;
  LastName?: string;
  PhoneNumber?: string;
  RoleId: number;
  RoleNavigation?: UserAuthority;
  IsEmailConfirmed: boolean;
  LastLoginDate?: string;
  RefreshToken?: string;
  RefreshTokenExpiryTime?: string;
  IsActive: boolean;
  Sessions: UserSession[];
}

