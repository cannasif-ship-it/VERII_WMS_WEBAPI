export interface FN_GoodsOpenOrders_HeaderDto {
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

export interface FN_GoodsOpenOrders_LineDto {
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

