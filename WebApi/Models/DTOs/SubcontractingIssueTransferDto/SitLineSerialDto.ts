import { BaseLineSerialCreateDto, BaseLineSerialEntityDto, BaseLineSerialUpdateDto } from '../../index';
export interface SitLineSerialDto extends BaseLineSerialEntityDto {
  LineId: number;
}

export interface CreateSitLineSerialDto extends BaseLineSerialCreateDto {
  LineId: number;
}

export interface UpdateSitLineSerialDto extends BaseLineSerialUpdateDto {
  LineId?: number;
}

