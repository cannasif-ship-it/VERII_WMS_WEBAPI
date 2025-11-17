export interface IcRoute extends BaseEntity {
  ImportLineId: number;
  Barcode?: string;
  OldQuantity: number;
  NewQuantity: number;
  SerialNo?: string;
  SerialNo2?: string;
  OldWarehouse?: number;
  NewWarehouse?: number;
  OldCellCode?: string;
  NewCellCode?: string;
  Description?: string;
}

