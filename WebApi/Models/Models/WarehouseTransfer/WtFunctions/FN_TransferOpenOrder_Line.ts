export interface FN_TransferOpenOrder_Line {
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

