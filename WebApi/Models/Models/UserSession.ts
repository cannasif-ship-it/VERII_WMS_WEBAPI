export interface UserSession extends BaseEntity {
  UserId: number;
  User?: User;
  SessionId: string;
  Token: string;
  CreatedAt: string;
  RevokedAt?: string;
  IpAddress?: string;
  UserAgent?: string;
  DeviceInfo?: string;
}

