import type { BaseLineSerialUpdateDto } from '../Base/BaseLineSerialUpdateDto';
import type { BaseLineSerialEntityDto } from '../Base/BaseLineSerialEntityDto';
import type { BaseLineSerialCreateDto } from '../Base/BaseLineSerialCreateDto';
export interface WtLineSerialDto extends BaseLineSerialEntityDto {
  LineId: number;
}

export interface CreateWtLineSerialDto extends BaseLineSerialCreateDto {
  LineId: number;
}

export interface UpdateWtLineSerialDto extends BaseLineSerialUpdateDto {
  LineId?: number;
}

