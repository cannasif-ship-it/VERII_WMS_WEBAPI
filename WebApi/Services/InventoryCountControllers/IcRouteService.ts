import type { CreateIcRouteDto, IcRouteDto, UpdateIcRouteDto } from '../../Models/index';
import axios from 'axios';
import { ApiResponseErrorHelper } from '../../ApiResponseErrorHelper';
import { API_BASE_URL, DEFAULT_TIMEOUT, CURRENTLANGUAGE, getAuthToken } from '../../baseUrl';
import type { ApiResponse, PagedResponse } from '../../Models/ApiResponse';
import type { IIcRouteService } from '../../Interfaces/index';

const api = axios.create({
  baseURL: API_BASE_URL + "/IcRoute",
  timeout: DEFAULT_TIMEOUT,
  headers: { 'Content-Type': 'application/json', Accept: 'application/json', 'X-Language': CURRENTLANGUAGE },
});

api.interceptors.request.use((config : any) => { const token = getAuthToken(); if (token) { config.headers.Authorization = `Bearer ${token}`; } return config; });

export class IcRouteService implements IIcRouteService {
  async getAll(): Promise<ApiResponse<IcRouteDto[]>> {
    try {
      const response = await api.get<ApiResponse<IcRouteDto[]>>('');
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<IcRouteDto[]>(error);
    }
  }

  async getById(id: number): Promise<ApiResponse<IcRouteDto>> {
    try {
      const response = await api.get<ApiResponse<IcRouteDto>>(`/${id}`);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<IcRouteDto>(error);
    }
  }

  async getByImportLineId(importLineId: number): Promise<ApiResponse<IcRouteDto[]>> {
    try {
      const response = await api.get<ApiResponse<IcRouteDto[]>>(`/importline/${importLineId}`);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<IcRouteDto[]>(error);
    }
  }

  async create(createDto: CreateIcRouteDto): Promise<ApiResponse<IcRouteDto>> {
    try {
      const response = await api.post<ApiResponse<IcRouteDto>>('', createDto);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<IcRouteDto>(error);
    }
  }

  async update(id: number, updateDto: UpdateIcRouteDto): Promise<ApiResponse<IcRouteDto>> {
    try {
      const response = await api.put<ApiResponse<IcRouteDto>>(`/${id}`, updateDto);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<IcRouteDto>(error);
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
