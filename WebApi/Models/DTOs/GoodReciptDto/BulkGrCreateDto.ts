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

export interface CreateGrImportDocumentSimpleDto {
  Base64: number[];
}

export interface BulkCreateGrRequestDto {
  Header: CreateGrHeaderDto;
  Documents?: CreateGrImportDocumentSimpleDto[];
  Lines?: CreateGrLineWithKeyDto[];
  ImportLines?: CreateGrImportLWithLineKeyDto[];
  SerialLines?: CreateGrImportSerialLineWithImportLineKeyDto[];
}

