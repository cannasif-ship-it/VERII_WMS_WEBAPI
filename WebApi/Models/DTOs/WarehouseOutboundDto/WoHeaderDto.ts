import { BaseHeaderCreateDto, BaseHeaderEntityDto, BaseHeaderUpdateDto } from '../../index';
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

