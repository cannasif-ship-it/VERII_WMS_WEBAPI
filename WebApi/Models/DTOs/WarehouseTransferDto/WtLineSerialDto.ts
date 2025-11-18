import { BaseLineSerialCreateDto, BaseLineSerialEntityDto, BaseLineSerialUpdateDto } from '../../index';
export interface WtLineSerialDto extends BaseLineSerialEntityDto {
  LineId: number;
}

export interface CreateWtLineSerialDto extends BaseLineSerialCreateDto {
  LineId: number;
}

export interface UpdateWtLineSerialDto extends BaseLineSerialUpdateDto {
  LineId?: number;
}

