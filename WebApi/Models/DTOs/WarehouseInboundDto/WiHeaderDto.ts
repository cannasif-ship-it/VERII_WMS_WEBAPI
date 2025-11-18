import type { BaseHeaderUpdateDto } from '../Base/BaseHeaderUpdateDto';
import type { BaseHeaderEntityDto } from '../Base/BaseHeaderEntityDto';
import type { BaseHeaderCreateDto } from '../Base/BaseHeaderCreateDto';
export interface WiHeaderDto extends BaseHeaderEntityDto {
  DocumentNo: string;
  DocumentDate: string;
  InboundType: string;
  AccountCode?: string;
  CustomerCode?: string;
  SourceWarehouse?: string;
  TargetWarehouse?: string;
  Type: number;
}

export interface CreateWiHeaderDto extends BaseHeaderCreateDto {
  DocumentNo: string;
  DocumentDate: string;
  InboundType: string;
  AccountCode?: string;
  CustomerCode?: string;
  SourceWarehouse?: string;
  TargetWarehouse?: string;
  Type: number;
}

export interface UpdateWiHeaderDto extends BaseHeaderUpdateDto {
  DocumentNo?: string;
  DocumentDate?: string;
  InboundType?: string;
  AccountCode?: string;
  CustomerCode?: string;
  SourceWarehouse?: string;
  TargetWarehouse?: string;
  Type?: number;
}

