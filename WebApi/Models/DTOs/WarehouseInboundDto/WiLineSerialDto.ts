export interface WiLineSerialDto extends BaseLineSerialEntityDto {
  LineId: number;
}

export interface CreateWiLineSerialDto extends BaseLineSerialCreateDto {
  LineId: number;
}

export interface UpdateWiLineSerialDto extends BaseLineSerialUpdateDto {
  LineId?: number;
}

