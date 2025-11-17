import { CreateMobilemenuLineDto, MobilemenuLineDto, UpdateMobilemenuLineDto } from '../../Models/index';
import axios from 'axios';
import { ApiResponseErrorHelper } from '../../ApiResponseErrorHelper';
import { API_BASE_URL, DEFAULT_TIMEOUT, CURRENTLANGUAGE, getAuthToken } from '../../baseUrl';
import { ApiResponse, PagedResponse } from '../../Models/ApiResponse';
import { IMobilemenuLineService } from '../../Interfaces/index';

const api = axios.create({
  baseURL: API_BASE_URL + "/MobilemenuLine",
  timeout: DEFAULT_TIMEOUT,
  headers: { 'Content-Type': 'application/json', Accept: 'application/json', 'X-Language': CURRENTLANGUAGE },
});

api.interceptors.request.use((config : any) => { const token = getAuthToken(); if (token) { config.headers.Authorization = `Bearer ${token}`; } return config; });

export class MobilemenuLineService implements IMobilemenuLineService {
  async getAll(): Promise<ApiResponse<MobilemenuLineDto[]>> {
    try {
      const response = await api.get<ApiResponse<MobilemenuLineDto[]>>('');
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<MobilemenuLineDto[]>(error);
    }
  }

  async getById(id: number): Promise<ApiResponse<MobilemenuLineDto>> {
    try {
      const response = await api.get<ApiResponse<MobilemenuLineDto>>(`/${id}`);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<MobilemenuLineDto>(error);
    }
  }

  async getByItemId(itemId: string): Promise<ApiResponse<MobilemenuLineDto>> {
    try {
      const response = await api.get<ApiResponse<MobilemenuLineDto>>(`/by-item-id/${itemId}`);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<MobilemenuLineDto>(error);
    }
  }

  async getByHeaderId(headerId: number): Promise<ApiResponse<MobilemenuLineDto[]>> {
    try {
      const response = await api.get<ApiResponse<MobilemenuLineDto[]>>(`/by-header/${headerId}`);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<MobilemenuLineDto[]>(error);
    }
  }

  async getByTitle(title: string): Promise<ApiResponse<MobilemenuLineDto[]>> {
    try {
      const response = await api.get<ApiResponse<MobilemenuLineDto[]>>(`/by-title/${title}`);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<MobilemenuLineDto[]>(error);
    }
  }

  async create(createDto: CreateMobilemenuLineDto): Promise<ApiResponse<MobilemenuLineDto>> {
    try {
      const response = await api.post<ApiResponse<MobilemenuLineDto>>('', createDto);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<MobilemenuLineDto>(error);
    }
  }

  async update(id: number, updateDto: UpdateMobilemenuLineDto): Promise<ApiResponse<MobilemenuLineDto>> {
    try {
      const response = await api.put<ApiResponse<MobilemenuLineDto>>(`/${id}`, updateDto);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<MobilemenuLineDto>(error);
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

}
