import type { BaseHeaderUpdateDto } from '../Base/BaseHeaderUpdateDto';
import type { BaseHeaderEntityDto } from '../Base/BaseHeaderEntityDto';
import type { BaseHeaderCreateDto } from '../Base/BaseHeaderCreateDto';
export interface GrHeaderDto extends BaseHeaderEntityDto {
  CustomerCode: string;
  ReturnCode: boolean;
  OCRSource: boolean;
  Description3?: string;
  Description4?: string;
  Description5?: string;
}

export interface CreateGrHeaderDto extends BaseHeaderCreateDto {
  CustomerCode: string;
  ReturnCode: boolean;
  OCRSource: boolean;
  Description3?: string;
  Description4?: string;
  Description5?: string;
}

export interface UpdateGrHeaderDto extends BaseHeaderUpdateDto {
  CustomerCode?: string;
  ReturnCode?: boolean;
  OCRSource?: boolean;
  Description3?: string;
  Description4?: string;
  Description5?: string;
}

