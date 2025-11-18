import { BaseImportLineCreateDto, BaseImportLineEntityDto, BaseImportLineUpdateDto } from '../../index';
export interface IcImportLineDto extends BaseImportLineEntityDto {
  HeaderId: number;
}

export interface CreateIcImportLineDto extends BaseImportLineCreateDto {
  HeaderId: number;
}

export interface UpdateIcImportLineDto extends BaseImportLineUpdateDto {
  HeaderId?: number;
}

