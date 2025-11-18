import { BaseLineSerialCreateDto, BaseLineSerialEntityDto, BaseLineSerialUpdateDto } from '../../index';
export interface SrtLineSerialDto extends BaseLineSerialEntityDto {
  LineId: number;
}

export interface CreateSrtLineSerialDto extends BaseLineSerialCreateDto {
  LineId: number;
}

export interface UpdateSrtLineSerialDto extends BaseLineSerialUpdateDto {
  LineId?: number;
}

