import { BaseEntityDto } from '../../index';
export interface BaseHeaderEntityDto extends BaseEntityDto {
  YearCode: string;
  BranchCode: string;
  ProjectCode?: string;
  PlannedDate: string;
  IsPlanned: boolean;
  DocumentType: string;
  Description1?: string;
  Description2?: string;
  PriorityLevel?: number;
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
}

