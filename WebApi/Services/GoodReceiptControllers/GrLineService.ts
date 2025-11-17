import { CreateGrLineDto, GrLineDto, UpdateGrLineDto } from '../../Models/index';
import axios from 'axios';
import { ApiResponseErrorHelper } from '../../ApiResponseErrorHelper';
import { API_BASE_URL, DEFAULT_TIMEOUT, CURRENTLANGUAGE, getAuthToken } from '../../baseUrl';
import { ApiResponse, PagedResponse } from '../../Models/ApiResponse';
import { IGrLineService } from '../../Interfaces/index';

const api = axios.create({
  baseURL: API_BASE_URL + "/GrLine",
  timeout: DEFAULT_TIMEOUT,
  headers: { 'Content-Type': 'application/json', Accept: 'application/json', 'X-Language': CURRENTLANGUAGE },
});

api.interceptors.request.use((config : any) => { const token = getAuthToken(); if (token) { config.headers.Authorization = `Bearer ${token}`; } return config; });

export class GrLineService implements IGrLineService {
  async getAll(): Promise<ApiResponse<GrLineDto[]>> {
    try {
      const response = await api.get<ApiResponse<GrLineDto[]>>('');
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<GrLineDto[]>(error);
    }
  }

  async getById(id: number): Promise<ApiResponse<GrLineDto>> {
    try {
      const response = await api.get<ApiResponse<GrLineDto>>(`/${id}`);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<GrLineDto>(error);
    }
  }

  async getByHeaderId(headerId: number): Promise<ApiResponse<GrLineDto[]>> {
    try {
      const response = await api.get<ApiResponse<GrLineDto[]>>(`/by-header/${headerId}`);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<GrLineDto[]>(error);
    }
  }

  async create(createDto: CreateGrLineDto): Promise<ApiResponse<GrLineDto>> {
    try {
      const response = await api.post<ApiResponse<GrLineDto>>('', createDto);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<GrLineDto>(error);
    }
  }

  async update(id: number, updateDto: UpdateGrLineDto): Promise<ApiResponse<GrLineDto>> {
    try {
      const response = await api.put<ApiResponse<GrLineDto>>(`/${id}`, updateDto);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<GrLineDto>(error);
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

  async getPaged(pageNumber: number, pageSize: number, sortBy: string, sortDirection: string): Promise<ApiResponse<PagedResponse<GrLineDto>>> {
    try {
      const response = await api.get<ApiResponse<PagedResponse<GrLineDto>>>(`/paged`, { params: { pageNumber: pageNumber, pageSize: pageSize, sortBy: sortBy, sortDirection: sortDirection } });
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<PagedResponse<GrLineDto>>(error);
    }
  }

}
