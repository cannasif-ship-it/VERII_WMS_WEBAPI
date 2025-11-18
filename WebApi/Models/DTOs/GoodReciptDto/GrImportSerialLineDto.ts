import type { BaseLineSerialUpdateDto } from '../Base/BaseLineSerialUpdateDto';
import type { BaseLineSerialEntityDto } from '../Base/BaseLineSerialEntityDto';
import type { BaseLineSerialCreateDto } from '../Base/BaseLineSerialCreateDto';
export interface GrImportSerialLineDto extends BaseLineSerialEntityDto {
  ImportLineId: number;
}

export interface CreateGrImportSerialLineDto extends BaseLineSerialCreateDto {
  ImportLineId: number;
}

export interface UpdateGrImportSerialLineDto extends BaseLineSerialUpdateDto {
  ImportLineId: number;
}

