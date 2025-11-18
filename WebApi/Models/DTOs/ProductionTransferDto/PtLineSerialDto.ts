import type { BaseLineSerialUpdateDto } from '../Base/BaseLineSerialUpdateDto';
import type { BaseLineSerialEntityDto } from '../Base/BaseLineSerialEntityDto';
import type { BaseLineSerialCreateDto } from '../Base/BaseLineSerialCreateDto';
export interface PtLineSerialDto extends BaseLineSerialEntityDto {
  LineId: number;
}

export interface CreatePtLineSerialDto extends BaseLineSerialCreateDto {
  LineId: number;
}

export interface UpdatePtLineSerialDto extends BaseLineSerialUpdateDto {
  LineId?: number;
}

