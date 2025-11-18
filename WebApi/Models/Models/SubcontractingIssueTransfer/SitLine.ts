import { BaseLineEntity, SitHeader, SitImportLine, SitLineSerial } from '../../index';
export interface SitLine extends BaseLineEntity {
  HeaderId: number;
  Header: SitHeader;
  ImportLines: SitImportLine[];
  SerialLines: SitLineSerial[];
}

