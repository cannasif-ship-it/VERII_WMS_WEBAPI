import axios from 'axios';
import { API_BASE_URL, DEFAULT_TIMEOUT, CURRENTLANGUAGE, getAuthToken } from '../baseUrl';
import { ApiResponseErrorHelper } from '../ApiResponseErrorHelper';
import { IGrImportSerialLineService } from '../Interfaces/IGrImportSerialLineService';
import { ApiResponse, PagedResult } from '../Models/ApiResponse';
import { GrImportSerialLineDto, CreateGrImportSerialLineDto, UpdateGrImportSerialLineDto } from '../Models/GrImportSerialLineDtos';

const api = axios.create({
  baseURL: API_BASE_URL + "/GrImportSerialLine",
  timeout: DEFAULT_TIMEOUT,
  headers: { 
    'Content-Type': 'application/json', 
    Accept: 'application/json',
    'X-Language': CURRENTLANGUAGE 
  },
});

// Request interceptor to add auth token
api.interceptors.request.use((config : any) => {
  const token = getAuthToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export class GrImportSerialLineService implements IGrImportSerialLineService {

  async getAll(): Promise<ApiResponse<GrImportSerialLineDto[]>> {
    try {
      const response = await api.get<ApiResponse<GrImportSerialLineDto[]>>('/');
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
      const response = await api.get<ApiResponse<GrImportSerialLineDto[]>>(`/by-import-line-id/${importLineId}`);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<GrImportSerialLineDto[]>(error);
    } 
  }

  async create(createDto: CreateGrImportSerialLineDto): Promise<ApiResponse<GrImportSerialLineDto>> {
    try {
      const response = await api.post<ApiResponse<GrImportSerialLineDto>>('/', createDto);
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
      const response = await api.delete<ApiResponse<boolean>>(`/${id}/soft`);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<boolean>(error);
    }
  }

  async exists(id: number): Promise<ApiResponse<boolean>> {
    try {
      const response = await api.get<ApiResponse<boolean>>(`/${id}/exists`);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<boolean>(error);
    } 
  }

  async getPaged(
    pageNumber: number,
    pageSize: number,
    sortBy: string,
    sortDirection: 'asc' | 'desc'
  ): Promise<ApiResponse<PagedResult<GrImportSerialLineDto>>> {
    try {
      const params = new URLSearchParams({
        pageNumber: String(pageNumber),
        pageSize: String(pageSize),
        sortBy: encodeURIComponent(sortBy),
        sortDirection
      });
      const response = await api.get<ApiResponse<PagedResult<GrImportSerialLineDto>>>(`/paged?${params.toString()}`);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<PagedResult<GrImportSerialLineDto>>(error);
    }
  }
}


