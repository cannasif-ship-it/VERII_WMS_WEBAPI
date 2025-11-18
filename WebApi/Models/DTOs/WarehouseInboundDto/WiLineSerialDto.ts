import type { BaseLineSerialUpdateDto } from '../Base/BaseLineSerialUpdateDto';
import type { BaseLineSerialEntityDto } from '../Base/BaseLineSerialEntityDto';
import type { BaseLineSerialCreateDto } from '../Base/BaseLineSerialCreateDto';
export interface WiLineSerialDto extends BaseLineSerialEntityDto {
  LineId: number;
}

export interface CreateWiLineSerialDto extends BaseLineSerialCreateDto {
  LineId: number;
}

export interface UpdateWiLineSerialDto extends BaseLineSerialUpdateDto {
  LineId?: number;
}

