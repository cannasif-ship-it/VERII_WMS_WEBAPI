import { BaseHeaderCreateDto, BaseHeaderEntityDto, BaseHeaderUpdateDto } from '../../index';
export interface IcHeaderDto extends BaseHeaderEntityDto {
  DocumentNo?: string;
  DocumentDate: string;
  CellCode?: string;
  WarehouseCode?: string;
  ProductCode?: string;
  Type: number;
}

export interface CreateIcHeaderDto extends BaseHeaderCreateDto {
  DocumentNo?: string;
  DocumentDate: string;
  CellCode?: string;
  WarehouseCode?: string;
  ProductCode?: string;
  Type: number;
}

export interface UpdateIcHeaderDto extends BaseHeaderUpdateDto {
  DocumentNo?: string;
  DocumentDate?: string;
  CellCode?: string;
  WarehouseCode?: string;
  ProductCode?: string;
  Type?: number;
}

