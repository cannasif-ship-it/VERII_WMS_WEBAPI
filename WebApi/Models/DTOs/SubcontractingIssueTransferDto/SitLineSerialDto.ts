import type { BaseLineSerialUpdateDto } from '../Base/BaseLineSerialUpdateDto';
import type { BaseLineSerialEntityDto } from '../Base/BaseLineSerialEntityDto';
import type { BaseLineSerialCreateDto } from '../Base/BaseLineSerialCreateDto';
export interface SitLineSerialDto extends BaseLineSerialEntityDto {
  LineId: number;
}

export interface CreateSitLineSerialDto extends BaseLineSerialCreateDto {
  LineId: number;
}

export interface UpdateSitLineSerialDto extends BaseLineSerialUpdateDto {
  LineId?: number;
}

