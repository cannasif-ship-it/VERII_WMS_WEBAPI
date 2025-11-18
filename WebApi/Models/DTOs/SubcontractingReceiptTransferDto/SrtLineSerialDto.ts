import type { BaseLineSerialUpdateDto } from '../Base/BaseLineSerialUpdateDto';
import type { BaseLineSerialEntityDto } from '../Base/BaseLineSerialEntityDto';
import type { BaseLineSerialCreateDto } from '../Base/BaseLineSerialCreateDto';
export interface SrtLineSerialDto extends BaseLineSerialEntityDto {
  LineId: number;
}

export interface CreateSrtLineSerialDto extends BaseLineSerialCreateDto {
  LineId: number;
}

export interface UpdateSrtLineSerialDto extends BaseLineSerialUpdateDto {
  LineId?: number;
}

