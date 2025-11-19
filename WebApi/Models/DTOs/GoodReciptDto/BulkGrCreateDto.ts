import { CreateGrHeaderDto, CreateGrImportDocumentSimpleDto, CreateGrImportLWithLineKeyDto, CreateGrImportSerialLineWithImportLineKeyDto, CreateGrLineWithKeyDto, CreateGrRouteWithImportLineKeyDto } from '../../index';
export interface CreateGrLineWithKeyDto {
  ClientKey: string;
  ClientGuid?: string;
  StockCode: string;
  Quantity: number;
  Unit?: string;
  ErpOrderNo?: string;
  ErpOrderLineNo?: string;
  Description?: string;
}

export interface CreateGrImportLWithLineKeyDto {
  LineClientKey: string;
  LineGroupGuid?: string;
  ClientKey?: string;
  StockCode: string;
  Description1?: string;
  Description2?: string;
}

export interface CreateGrImportSerialLineWithImportLineKeyDto {
  ImportLineClientKey: string;
  ImportLineGroupGuid?: string;
  SerialNo: string;
  Quantity: number;
  SourceCellCode?: string;
  TargetCellCode?: string;
  SerialNo2?: string;
  SerialNo3?: string;
  SerialNo4?: string;
}

export interface CreateGrRouteWithImportLineKeyDto {
  ImportLineClientKey: string;
  ImportLineGroupGuid?: string;
  ClientKey?: string;
  ScannedBarcode: string;
  Quantity: number;
  StockCode?: string;
  RouteCode?: string;
  Description?: string;
  SerialNo?: string;
  SerialNo2?: string;
  SerialNo3?: string;
  SerialNo4?: string;
  SourceWarehouse?: number;
  TargetWarehouse?: number;
  SourceCellCode?: string;
  TargetCellCode?: string;
}

export interface CreateGrImportDocumentSimpleDto {
  Base64: number[];
}

export interface BulkCreateGrRequestDto {
  Header: CreateGrHeaderDto;
  Documents?: CreateGrImportDocumentSimpleDto[];
  Lines?: CreateGrLineWithKeyDto[];
  ImportLines?: CreateGrImportLWithLineKeyDto[];
  SerialLines?: CreateGrImportSerialLineWithImportLineKeyDto[];
  Routes?: CreateGrRouteWithImportLineKeyDto[];
}

