export interface WtHeader extends BaseHeaderEntity {
  CustomerCode?: string;
  SourceWarehouse?: string;
  TargetWarehouse?: string;
  ElectronicWaybill: boolean;
  ShipmentId?: number;
}

