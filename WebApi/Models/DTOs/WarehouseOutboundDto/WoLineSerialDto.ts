import { BaseLineSerialCreateDto, BaseLineSerialEntityDto, BaseLineSerialUpdateDto } from '../../index';
export interface WoLineSerialDto extends BaseLineSerialEntityDto {
  LineId: number;
}

export interface CreateWoLineSerialDto extends BaseLineSerialCreateDto {
  LineId: number;
}

export interface UpdateWoLineSerialDto extends BaseLineSerialUpdateDto {
  LineId?: number;
}

