import { CreateGrImportDocumentDto, GrImportDocumentDto, UpdateGrImportDocumentDto } from '../../Models/index';
import axios from 'axios';
import { ApiResponseErrorHelper } from '../../ApiResponseErrorHelper';
import { API_BASE_URL, DEFAULT_TIMEOUT, CURRENTLANGUAGE, getAuthToken } from '../../baseUrl';
import { ApiResponse, PagedResponse } from '../../Models/ApiResponse';
import { IGrImportDocumentService } from '../../Interfaces/index';

const api = axios.create({
  baseURL: API_BASE_URL + "/GrImportDocument",
  timeout: DEFAULT_TIMEOUT,
  headers: { 'Content-Type': 'application/json', Accept: 'application/json', 'X-Language': CURRENTLANGUAGE },
});

api.interceptors.request.use((config : any) => { const token = getAuthToken(); if (token) { config.headers.Authorization = `Bearer ${token}`; } return config; });

export class GrImportDocumentService implements IGrImportDocumentService {
  async getAll(): Promise<ApiResponse<GrImportDocumentDto[]>> {
    try {
      const response = await api.get<ApiResponse<GrImportDocumentDto[]>>('');
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<GrImportDocumentDto[]>(error);
    }
  }

  async getById(id: number): Promise<ApiResponse<GrImportDocumentDto>> {
    try {
      const response = await api.get<ApiResponse<GrImportDocumentDto>>(`/${id}`);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<GrImportDocumentDto>(error);
    }
  }

  async getByHeaderId(headerId: number): Promise<ApiResponse<GrImportDocumentDto[]>> {
    try {
      const response = await api.get<ApiResponse<GrImportDocumentDto[]>>(`/by-header/${headerId}`);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<GrImportDocumentDto[]>(error);
    }
  }

  async create(createDto: CreateGrImportDocumentDto): Promise<ApiResponse<GrImportDocumentDto>> {
    try {
      const response = await api.post<ApiResponse<GrImportDocumentDto>>('', createDto);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<GrImportDocumentDto>(error);
    }
  }

  async update(id: number, updateDto: UpdateGrImportDocumentDto): Promise<ApiResponse<GrImportDocumentDto>> {
    try {
      const response = await api.put<ApiResponse<GrImportDocumentDto>>(`/${id}`, updateDto);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<GrImportDocumentDto>(error);
    }
  }

  async softDelete(id: number): Promise<ApiResponse<boolean>> {
    try {
      const response = await api.delete<ApiResponse<boolean>>(`/${id}`);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<boolean>(error);
    }
  }

  async getPaged(pageNumber: number, pageSize: number, sortBy: string, sortDirection: string): Promise<ApiResponse<PagedResponse<GrImportDocumentDto>>> {
    try {
      const response = await api.get<ApiResponse<PagedResponse<GrImportDocumentDto>>>(`/paged`, { params: { pageNumber: pageNumber, pageSize: pageSize, sortBy: sortBy, sortDirection: sortDirection } });
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<PagedResponse<GrImportDocumentDto>>(error);
    }
  }

}
