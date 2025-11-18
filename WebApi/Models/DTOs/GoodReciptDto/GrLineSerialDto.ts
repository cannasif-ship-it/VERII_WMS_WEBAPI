import type { BaseLineSerialUpdateDto } from '../Base/BaseLineSerialUpdateDto';
import type { BaseLineSerialEntityDto } from '../Base/BaseLineSerialEntityDto';
import type { BaseLineSerialCreateDto } from '../Base/BaseLineSerialCreateDto';
export interface GrLineSerialDto extends BaseLineSerialEntityDto {
  ImportLineId: number;
}

export interface CreateGrLineSerialDto extends BaseLineSerialCreateDto {
  ImportLineId: number;
}

export interface UpdateGrLineSerialDto extends BaseLineSerialUpdateDto {
  ImportLineId?: number;
}

