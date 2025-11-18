import { AuditedEntityDto, UserDto } from '../index';
export interface UserDto extends AuditedEntityDto {
  Username: string;
  Email: string;
  FirstName?: string;
  LastName?: string;
  PhoneNumber?: string;
  Role: string;
  IsEmailConfirmed: boolean;
  LastLoginDate?: string;
  FullName: string;
}

export interface LoginDto {
  Username: string;
  Password: string;
  RememberMe: boolean;
}

export interface RegisterDto {
  Username: string;
  Email: string;
  Password: string;
  ConfirmPassword: string;
  FirstName?: string;
  LastName?: string;
  PhoneNumber?: string;
}

export interface LoginResponseDto {
  AccessToken: string;
  RefreshToken: string;
  ExpiresAt: string;
  User: UserDto;
}

export interface RefreshTokenDto {
  RefreshToken: string;
}

export interface ChangePasswordDto {
  CurrentPassword: string;
  NewPassword: string;
  ConfirmNewPassword: string;
}

export interface UpdateUserDto {
  Email?: string;
  FirstName?: string;
  LastName?: string;
  PhoneNumber?: string;
}

