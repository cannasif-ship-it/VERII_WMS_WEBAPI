import type { BaseHeaderUpdateDto } from '../Base/BaseHeaderUpdateDto';
import type { BaseHeaderEntityDto } from '../Base/BaseHeaderEntityDto';
import type { BaseHeaderCreateDto } from '../Base/BaseHeaderCreateDto';
export interface WoHeaderDto extends BaseHeaderEntityDto {
  DocumentNo: string;
  DocumentDate: string;
  OutboundType: string;
  AccountCode?: string;
  CustomerCode?: string;
  SourceWarehouse?: string;
  TargetWarehouse?: string;
  Type: number;
}

export interface CreateWoHeaderDto extends BaseHeaderCreateDto {
  DocumentNo: string;
  DocumentDate: string;
  OutboundType: string;
  AccountCode?: string;
  CustomerCode?: string;
  SourceWarehouse?: string;
  TargetWarehouse?: string;
  Type: number;
}

export interface UpdateWoHeaderDto extends BaseHeaderUpdateDto {
  DocumentNo?: string;
  DocumentDate?: string;
  OutboundType?: string;
  AccountCode?: string;
  CustomerCode?: string;
  SourceWarehouse?: string;
  TargetWarehouse?: string;
  Type?: number;
}

