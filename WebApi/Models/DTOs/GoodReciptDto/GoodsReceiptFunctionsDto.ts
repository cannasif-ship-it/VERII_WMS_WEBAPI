export interface GoodsOpenOrdersHeaderDto {
  Mode: string;
  SiparisNo: string;
  OrderID?: number;
  CustomerCode?: string;
  CustomerName?: string;
  BranchCode?: number;
  TargetWh?: number;
  ProjectCode?: string;
  OrderDate?: string;
  OrderedQty?: number;
  DeliveredQty?: number;
  RemainingHamax?: number;
  PlannedQtyAllocated: number;
  RemainingForImport?: number;
}

export interface GoodsOpenOrdersLineDto {
  Mode: string;
  SiparisNo: string;
  OrderID: number;
  StockCode?: string;
  StockName?: string;
  CustomerCode?: string;
  CustomerName?: string;
  BranchCode: number;
  TargetWh?: number;
  ProjectCode?: string;
  OrderDate?: string;
  OrderedQty?: number;
  DeliveredQty?: number;
  RemainingHamax?: number;
  PlannedQtyAllocated: number;
  RemainingForImport?: number;
}

