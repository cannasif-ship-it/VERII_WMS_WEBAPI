import type { InventoryUpdateRequest, ReminderEmailRequest, WelcomeEmailRequest } from '../Models/index';
import axios from 'axios';
import { ApiResponseErrorHelper } from '../ApiResponseErrorHelper';
import { API_BASE_URL, DEFAULT_TIMEOUT, CURRENTLANGUAGE, getAuthToken } from '../baseUrl';
import type { ApiResponse, PagedResponse } from '../ApiResponse';
import type { IJobService } from '../Interfaces/index';

const api = axios.create({
  baseURL: API_BASE_URL + "/Job",
  timeout: DEFAULT_TIMEOUT,
  headers: { 'Content-Type': 'application/json', Accept: 'application/json', 'X-Language': CURRENTLANGUAGE },
});

api.interceptors.request.use((config : any) => { const token = getAuthToken(); if (token) { config.headers.Authorization = `Bearer ${token}`; } return config; });

export class JobService implements IJobService {
  async sendWelcomeEmail(request: WelcomeEmailRequest): Promise<ApiResponse<any>> {
    try {
      const response = await api.post<ApiResponse<any>>(`/send-welcome-email`, request);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<any>(error);
    }
  }

  async sendReminderEmail(request: ReminderEmailRequest): Promise<ApiResponse<any>> {
    try {
      const response = await api.post<ApiResponse<any>>(`/send-reminder-email`, request);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<any>(error);
    }
  }

  async scheduleDailyReport(): Promise<ApiResponse<any>> {
    try {
      const response = await api.post<ApiResponse<any>>(`/schedule-daily-report`);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<any>(error);
    }
  }

  async processWithCleanup(request: InventoryUpdateRequest): Promise<ApiResponse<any>> {
    try {
      const response = await api.post<ApiResponse<any>>(`/process-with-cleanup`, request);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<any>(error);
    }
  }

  async stopDailyReport(): Promise<ApiResponse<any>> {
    try {
      const response = await api.delete<ApiResponse<any>>(`/stop-daily-report`);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<any>(error);
    }
  }

  async cancelJob(jobId: string): Promise<ApiResponse<any>> {
    try {
      const response = await api.delete<ApiResponse<any>>(`/cancel-job/${jobId}`);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<any>(error);
    }
  }

}
