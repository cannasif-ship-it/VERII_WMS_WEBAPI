import type { CreateIcHeaderDto, IcHeaderDto, UpdateIcHeaderDto } from '../../Models/index';
import axios from 'axios';
import { ApiResponseErrorHelper } from '../../ApiResponseErrorHelper';
import { API_BASE_URL, DEFAULT_TIMEOUT, CURRENTLANGUAGE, getAuthToken } from '../../baseUrl';
import type { ApiResponse, PagedResponse } from '../../Models/ApiResponse';
import type { IIcHeaderService } from '../../Interfaces/index';

const api = axios.create({
  baseURL: API_BASE_URL + "/IcHeader",
  timeout: DEFAULT_TIMEOUT,
  headers: { 'Content-Type': 'application/json', Accept: 'application/json', 'X-Language': CURRENTLANGUAGE },
});

api.interceptors.request.use((config : any) => { const token = getAuthToken(); if (token) { config.headers.Authorization = `Bearer ${token}`; } return config; });

export class IcHeaderService implements IIcHeaderService {
  async getAll(): Promise<ApiResponse<IcHeaderDto[]>> {
    try {
      const response = await api.get<ApiResponse<IcHeaderDto[]>>('');
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<IcHeaderDto[]>(error);
    }
  }

  async getById(id: number): Promise<ApiResponse<IcHeaderDto>> {
    try {
      const response = await api.get<ApiResponse<IcHeaderDto>>(`/${id}`);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<IcHeaderDto>(error);
    }
  }

  async create(createDto: CreateIcHeaderDto): Promise<ApiResponse<IcHeaderDto>> {
    try {
      const response = await api.post<ApiResponse<IcHeaderDto>>('', createDto);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<IcHeaderDto>(error);
    }
  }

  async update(id: number, updateDto: UpdateIcHeaderDto): Promise<ApiResponse<IcHeaderDto>> {
    try {
      const response = await api.put<ApiResponse<IcHeaderDto>>(`/${id}`, updateDto);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<IcHeaderDto>(error);
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
