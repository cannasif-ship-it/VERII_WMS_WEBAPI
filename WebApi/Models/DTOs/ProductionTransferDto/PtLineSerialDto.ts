export interface PtLineSerialDto extends BaseLineSerialEntityDto {
  LineId: number;
}

export interface CreatePtLineSerialDto extends BaseLineSerialCreateDto {
  LineId: number;
}

export interface UpdatePtLineSerialDto extends BaseLineSerialUpdateDto {
  LineId?: number;
}

