import type { BaseLineSerialCreateDto } from '../Base/BaseLineSerialCreateDto';
export interface CreateWtLineWithKeyDto {
  ClientKey?: string;
  ClientGuid?: string;
  StockCode: string;
  OrderId?: number;
  Quantity: number;
  Unit?: string;
  ErpOrderNo?: string;
  ErpOrderLineNo?: string;
  ErpLineReference?: string;
  Description?: string;
}

export interface CreateWtRouteWithLineKeyDto {
  LineClientKey?: string;
  LineGroupGuid?: string;
  ClientKey?: string;
  ClientGroupGuid?: string;
  StockCode: string;
  RouteCode?: string;
  Quantity: number;
  SerialNo?: string;
  SerialNo2?: string;
  SourceWarehouse?: number;
  TargetWarehouse?: number;
  SourceCellCode?: string;
  TargetCellCode?: string;
  Priority: number;
  Description?: string;
}

export interface CreateWtImportLineWithKeysDto {
  LineClientKey?: string;
  LineGroupGuid?: string;
  RouteClientKey?: string;
  RouteGroupGuid?: string;
  StockCode: string;
  Quantity: number;
  Unit?: string;
  SerialNo?: string;
  SerialNo2?: string;
  SerialNo3?: string;
  SerialNo4?: string;
  ScannedBarkod?: string;
  ErpOrderNumber?: string;
  ErpOrderNo?: string;
  ErpOrderLineNumber?: string;
}

export interface BulkCreateWtRequestDto {
  Header: CreateWtHeaderDto;
  Lines?: CreateWtLineWithKeyDto[];
  Routes?: CreateWtRouteWithLineKeyDto[];
  ImportLines?: CreateWtImportLineWithKeysDto[];
}

export interface CreateWtLineSerialWithLineKeyDto extends BaseLineSerialCreateDto {
  LineClientKey?: string;
  LineGroupGuid?: string;
}

export interface CreateWtTerminalLineWithUserDto {
  TerminalUserId: number;
}

export interface GenerateWarehouseTransferOrderRequestDto {
  Header: CreateWtHeaderDto;
  Lines?: CreateWtLineWithKeyDto[];
  LineSerials?: CreateWtLineSerialWithLineKeyDto[];
  TerminalLines?: CreateWtTerminalLineWithUserDto[];
}

