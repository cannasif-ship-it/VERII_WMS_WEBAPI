import { BaseEntityDto } from '../../index';
export interface BaseImportLineEntityDto extends BaseEntityDto {
  StockCode: string;
  YapKod?: string;
  Description1?: string;
  Description2?: string;
  Description?: string;
}

