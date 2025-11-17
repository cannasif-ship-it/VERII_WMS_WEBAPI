export interface WtHeaderDto {
  Id: number;
  BranchCode: string;
  ProjectCode?: string;
  DocumentNo: string;
  DocumentDate: string;
  DocumentType: string;
  CustomerCode?: string;
  CustomerName?: string;
  SourceWarehouse?: string;
  TargetWarehouse?: string;
  Priority?: string;
  YearCode: string;
  Description1?: string;
  Description2?: string;
  PriorityLevel?: number;
  Type: number;
  CreatedBy?: string;
  CreatedDate: string;
  UpdatedBy?: string;
  UpdatedDate?: string;
  IsDeleted: boolean;
  DeletedBy?: string;
  DeletedDate?: string;
  CompletionDate?: string;
  IsCompleted: boolean;
  IsPendingApproval: boolean;
  ApprovalStatus?: boolean;
  ApprovedByUserId?: number;
  ApprovalDate?: string;
  IsERPIntegrated: boolean;
  ERPReferenceNumber?: string;
  ERPIntegrationDate?: string;
  ERPIntegrationStatus?: string;
  ERPErrorMessage?: string;
  CreatedByFullUser?: string;
  UpdatedByFullUser?: string;
  DeletedByFullUser?: string;
}

export interface CreateWtHeaderDto extends BaseHeaderCreateDto {
  DocumentNo: string;
  DocumentDate: string;
  CustomerCode?: string;
  CustomerName?: string;
  SourceWarehouse?: string;
  TargetWarehouse?: string;
  Priority?: string;
  Type: number;
}

export interface UpdateWtHeaderDto extends BaseHeaderUpdateDto {
  DocumentNo?: string;
  DocumentDate?: string;
  CustomerCode?: string;
  CustomerName?: string;
  SourceWarehouse?: string;
  TargetWarehouse?: string;
  Priority?: string;
  Type?: number;
}

