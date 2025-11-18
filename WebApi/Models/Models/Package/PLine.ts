import type { BaseEntity } from '../BaseEntity';
export interface PLine extends BaseEntity {
  PackageCode: string;
  PackageType: string;
  SourceType?: string;
  SourceId?: number;
  WarehouseCode?: string;
  LocationCode?: string;
  GrossWeight?: number;
  NetWeight?: number;
  Volume?: number;
  Description?: string;
  Lines: PLine[];
}

