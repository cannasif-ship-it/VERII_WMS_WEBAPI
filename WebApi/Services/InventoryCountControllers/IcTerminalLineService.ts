import type { CreateIcTerminalLineDto, IcTerminalLineDto, UpdateIcTerminalLineDto } from '../../Models/index';
import axios from 'axios';
import { ApiResponseErrorHelper } from '../../ApiResponseErrorHelper';
import { API_BASE_URL, DEFAULT_TIMEOUT, CURRENTLANGUAGE, getAuthToken } from '../../baseUrl';
import type { ApiResponse, PagedResponse } from '../../Models/ApiResponse';
import type { IIcTerminalLineService } from '../../Interfaces/index';

const api = axios.create({
  baseURL: API_BASE_URL + "/IcTerminalLine",
  timeout: DEFAULT_TIMEOUT,
  headers: { 'Content-Type': 'application/json', Accept: 'application/json', 'X-Language': CURRENTLANGUAGE },
});

api.interceptors.request.use((config : any) => { const token = getAuthToken(); if (token) { config.headers.Authorization = `Bearer ${token}`; } return config; });

export class IcTerminalLineService implements IIcTerminalLineService {
  async getAll(): Promise<ApiResponse<IcTerminalLineDto[]>> {
    try {
      const response = await api.get<ApiResponse<IcTerminalLineDto[]>>('');
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<IcTerminalLineDto[]>(error);
    }
  }

  async getById(id: number): Promise<ApiResponse<IcTerminalLineDto>> {
    try {
      const response = await api.get<ApiResponse<IcTerminalLineDto>>(`/${id}`);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<IcTerminalLineDto>(error);
    }
  }

  async getByHeaderId(headerId: number): Promise<ApiResponse<IcTerminalLineDto[]>> {
    try {
      const response = await api.get<ApiResponse<IcTerminalLineDto[]>>(`/header/${headerId}`);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<IcTerminalLineDto[]>(error);
    }
  }

  async create(createDto: CreateIcTerminalLineDto): Promise<ApiResponse<IcTerminalLineDto>> {
    try {
      const response = await api.post<ApiResponse<IcTerminalLineDto>>('', createDto);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<IcTerminalLineDto>(error);
    }
  }

  async update(id: number, updateDto: UpdateIcTerminalLineDto): Promise<ApiResponse<IcTerminalLineDto>> {
    try {
      const response = await api.put<ApiResponse<IcTerminalLineDto>>(`/${id}`, updateDto);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<IcTerminalLineDto>(error);
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
