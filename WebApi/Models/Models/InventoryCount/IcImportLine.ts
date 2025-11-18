import type { IcHeader } from './IcHeader';
import type { BaseEntity } from '../BaseEntity';
export interface IcImportLine extends BaseEntity {
  HeaderId: number;
  Header: IcHeader;
  StockCode: string;
  YapKod?: string;
  Description1?: string;
  Description2?: string;
  Description?: string;
  Routes: IcRoute[];
}

