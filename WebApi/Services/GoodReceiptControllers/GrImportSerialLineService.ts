import { CreateGrImportSerialLineDto, GrImportSerialLineDto, UpdateGrImportSerialLineDto } from '../../Models/index';
import axios from 'axios';
import { ApiResponseErrorHelper } from '../../ApiResponseErrorHelper';
import { API_BASE_URL, DEFAULT_TIMEOUT, CURRENTLANGUAGE, getAuthToken } from '../../baseUrl';
import { ApiResponse, PagedResponse } from '../../Models/ApiResponse';
import { IGrImportSerialLineService } from '../../Interfaces/index';

const api = axios.create({
  baseURL: API_BASE_URL + "/GrImportSerialLine",
  timeout: DEFAULT_TIMEOUT,
  headers: { 'Content-Type': 'application/json', Accept: 'application/json', 'X-Language': CURRENTLANGUAGE },
});

api.interceptors.request.use((config : any) => { const token = getAuthToken(); if (token) { config.headers.Authorization = `Bearer ${token}`; } return config; });

export class GrImportSerialLineService implements IGrImportSerialLineService {
  async getAll(): Promise<ApiResponse<GrImportSerialLineDto[]>> {
    try {
      const response = await api.get<ApiResponse<GrImportSerialLineDto[]>>('');
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<GrImportSerialLineDto[]>(error);
    }
  }

  async getById(id: number): Promise<ApiResponse<GrImportSerialLineDto>> {
    try {
      const response = await api.get<ApiResponse<GrImportSerialLineDto>>(`/${id}`);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<GrImportSerialLineDto>(error);
    }
  }

  async getByImportLineId(importLineId: number): Promise<ApiResponse<GrImportSerialLineDto[]>> {
    try {
      const response = await api.get<ApiResponse<GrImportSerialLineDto[]>>(`/by-import-line/${importLineId}`);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<GrImportSerialLineDto[]>(error);
    }
  }

  async create(createDto: CreateGrImportSerialLineDto): Promise<ApiResponse<GrImportSerialLineDto>> {
    try {
      const response = await api.post<ApiResponse<GrImportSerialLineDto>>('', createDto);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<GrImportSerialLineDto>(error);
    }
  }

  async update(id: number, updateDto: UpdateGrImportSerialLineDto): Promise<ApiResponse<GrImportSerialLineDto>> {
    try {
      const response = await api.put<ApiResponse<GrImportSerialLineDto>>(`/${id}`, updateDto);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<GrImportSerialLineDto>(error);
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

  async getPaged(pageNumber: number, pageSize: number, sortBy: string, sortDirection: string): Promise<ApiResponse<PagedResponse<GrImportSerialLineDto>>> {
    try {
      const response = await api.get<ApiResponse<PagedResponse<GrImportSerialLineDto>>>(`/paged`, { params: { pageNumber: pageNumber, pageSize: pageSize, sortBy: sortBy, sortDirection: sortDirection } });
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<PagedResponse<GrImportSerialLineDto>>(error);
    }
  }

}
