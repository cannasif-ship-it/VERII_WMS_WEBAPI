import type { BaseLineSerialUpdateDto } from '../Base/BaseLineSerialUpdateDto';
import type { BaseLineSerialEntityDto } from '../Base/BaseLineSerialEntityDto';
import type { BaseLineSerialCreateDto } from '../Base/BaseLineSerialCreateDto';
export interface WoLineSerialDto extends BaseLineSerialEntityDto {
  LineId: number;
}

export interface CreateWoLineSerialDto extends BaseLineSerialCreateDto {
  LineId: number;
}

export interface UpdateWoLineSerialDto extends BaseLineSerialUpdateDto {
  LineId?: number;
}

