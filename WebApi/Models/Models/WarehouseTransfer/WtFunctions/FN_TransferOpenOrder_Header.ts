export interface FN_TransferOpenOrder_Header {
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

