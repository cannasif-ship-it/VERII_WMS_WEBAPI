import { BaseEntity, IcHeader, IcRoute } from '../../index';
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

