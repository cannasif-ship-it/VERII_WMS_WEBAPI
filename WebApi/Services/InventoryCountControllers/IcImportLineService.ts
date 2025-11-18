import type { CreateIcImportLineDto, IcImportLineDto, UpdateIcImportLineDto } from '../../Models/index';
import axios from 'axios';
import { ApiResponseErrorHelper } from '../../ApiResponseErrorHelper';
import { API_BASE_URL, DEFAULT_TIMEOUT, CURRENTLANGUAGE, getAuthToken } from '../../baseUrl';
import type { ApiResponse, PagedResponse } from '../../ApiResponse';
import type { IIcImportLineService } from '../../Interfaces/index';

const api = axios.create({
  baseURL: API_BASE_URL + "/IcImportLine",
  timeout: DEFAULT_TIMEOUT,
  headers: { 'Content-Type': 'application/json', Accept: 'application/json', 'X-Language': CURRENTLANGUAGE },
});

api.interceptors.request.use((config : any) => { const token = getAuthToken(); if (token) { config.headers.Authorization = `Bearer ${token}`; } return config; });

export class IcImportLineService implements IIcImportLineService {
  async getAll(): Promise<ApiResponse<IcImportLineDto[]>> {
    try {
      const response = await api.get<ApiResponse<IcImportLineDto[]>>('');
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<IcImportLineDto[]>(error);
    }
  }

  async getById(id: number): Promise<ApiResponse<IcImportLineDto>> {
    try {
      const response = await api.get<ApiResponse<IcImportLineDto>>(`/${id}`);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<IcImportLineDto>(error);
    }
  }

  async getByHeaderId(headerId: number): Promise<ApiResponse<IcImportLineDto[]>> {
    try {
      const response = await api.get<ApiResponse<IcImportLineDto[]>>(`/header/${headerId}`);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<IcImportLineDto[]>(error);
    }
  }

  async create(createDto: CreateIcImportLineDto): Promise<ApiResponse<IcImportLineDto>> {
    try {
      const response = await api.post<ApiResponse<IcImportLineDto>>('', createDto);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<IcImportLineDto>(error);
    }
  }

  async update(id: number, updateDto: UpdateIcImportLineDto): Promise<ApiResponse<IcImportLineDto>> {
    try {
      const response = await api.put<ApiResponse<IcImportLineDto>>(`/${id}`, updateDto);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<IcImportLineDto>(error);
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
