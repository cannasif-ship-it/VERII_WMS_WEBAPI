export interface BaseHeaderCreateDto {
  BranchCode: string;
  ProjectCode?: string;
  DocumentType: string;
  YearCode: string;
  Description1?: string;
  Description2?: string;
  PriorityLevel?: number;
  PlannedDate: string;
  IsPlanned: boolean;
}

