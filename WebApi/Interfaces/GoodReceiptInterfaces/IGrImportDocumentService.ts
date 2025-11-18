import type { CreateGrImportDocumentDto, GrImportDocumentDto, UpdateGrImportDocumentDto } from '../../Models/index';
import type { ApiResponse, PagedResponse } from '../../Models/ApiResponse';

export interface IGrImportDocumentService {
  getAll(): Promise<ApiResponse<GrImportDocumentDto[]>>;
  getPaged(pageNumber: number, pageSize: number, sortBy: string, sortDirection: string): Promise<ApiResponse<PagedResponse<GrImportDocumentDto>>>;
  getById(id: number): Promise<ApiResponse<GrImportDocumentDto>>;
  getByHeaderId(headerId: number): Promise<ApiResponse<GrImportDocumentDto[]>>;
  create(createDto: CreateGrImportDocumentDto): Promise<ApiResponse<GrImportDocumentDto>>;
  update(id: number, updateDto: UpdateGrImportDocumentDto): Promise<ApiResponse<GrImportDocumentDto>>;
  softDelete(id: number): Promise<ApiResponse<boolean>>;
  exists(id: number): Promise<ApiResponse<boolean>>;
}
