export interface GrLineSerialDto extends BaseLineSerialEntityDto {
  ImportLineId: number;
}

export interface CreateGrLineSerialDto extends BaseLineSerialCreateDto {
  ImportLineId: number;
}

export interface UpdateGrLineSerialDto extends BaseLineSerialUpdateDto {
  ImportLineId?: number;
}

