import axios, { AxiosInstance, AxiosResponse, AxiosError } from 'axios';

// ==================== TYPE DEFINITIONS ====================
export interface ApiResponse<T = any> {
  success: boolean;
  data: T | null;
  error: string | null;
  statusCode: number;
  timestamp: string;
}

export interface ApiError {
  message: string;
  code: string;
  details?: any;
  statusCode: number;
}

export interface PaginationParams {
  page?: number;
  limit?: number;
  offset?: number;
}

// ==================== API CLIENT SETUP ====================
const apiClient: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:3000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// ==================== REQUEST INTERCEPTOR ====================
apiClient.interceptors.request.use(
  (config) => {
    // Add auth token if available
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Add request timestamp
    config.headers['X-Request-ID'] = generateRequestId();
    config.headers['X-Timestamp'] = new Date().toISOString();

    console.log(`[API] ${config.method?.toUpperCase()} ${config.url}`);

    return config;
  },
  (error) => {
    console.error('[API Request Error]', error);
    return Promise.reject(error);
  }
);

// ==================== RESPONSE INTERCEPTOR ====================
apiClient.interceptors.response.use(
  (response) => {
    console.log(`[API] ✓ ${response.status} ${response.config.url}`);
    return response;
  },
  (error: AxiosError) => {
    const errorData = error.response?.data as any;

    if (error.response?.status === 401) {
      // Handle unauthorized
      localStorage.removeItem('auth_token');
      console.warn('[API] Unauthorized - clearing token');
    }

    if (error.response?.status === 429) {
      console.warn('[API] Rate limited - please try again later');
    }

    console.error(
      `[API] ✗ ${error.response?.status} ${error.config?.url}`,
      errorData?.message || error.message
    );

    return Promise.reject(error);
  }
);

// ==================== HELPER FUNCTIONS ====================
function generateRequestId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

function formatError(error: any): ApiError {
  if (error.response?.data) {
    return {
      message: error.response.data.message || 'An error occurred',
      code: error.response.data.code || `HTTP_${error.response.status}`,
      details: error.response.data.details,
      statusCode: error.response.status,
    };
  }

  if (error.message === 'Network Error') {
    return {
      message: 'Network error - please check your connection',
      code: 'NETWORK_ERROR',
      statusCode: 0,
    };
  }

  return {
    message: error.message || 'An error occurred',
    code: 'UNKNOWN_ERROR',
    statusCode: error.response?.status || 0,
  };
}

// ==================== GLOBAL API FUNCTIONS ====================

/**
 * GET request
 * @param url - API endpoint
 * @param params - Query parameters
 * @returns Promise with data
 */
export async function apiGet<T = any>(url: string, params?: Record<string, any>): Promise<T> {
  try {
    const response = await apiClient.get<T>(url, { params });
    return response.data;
  } catch (error) {
    throw formatError(error);
  }
}

/**
 * POST request
 * @param url - API endpoint
 * @param data - Request body
 * @param config - Additional config
 * @returns Promise with data
 */
export async function apiPost<T = any>(
  url: string,
  data?: Record<string, any>,
  config?: Record<string, any>
): Promise<T> {
  try {
    const response = await apiClient.post<T>(url, data, config);
    return response.data;
  } catch (error) {
    throw formatError(error);
  }
}

/**
 * PUT request
 * @param url - API endpoint
 * @param data - Request body
 * @param config - Additional config
 * @returns Promise with data
 */
export async function apiPut<T = any>(
  url: string,
  data?: Record<string, any>,
  config?: Record<string, any>
): Promise<T> {
  try {
    const response = await apiClient.put<T>(url, data, config);
    return response.data;
  } catch (error) {
    throw formatError(error);
  }
}

/**
 * PATCH request
 * @param url - API endpoint
 * @param data - Request body
 * @param config - Additional config
 * @returns Promise with data
 */
export async function apiPatch<T = any>(
  url: string,
  data?: Record<string, any>,
  config?: Record<string, any>
): Promise<T> {
  try {
    const response = await apiClient.patch<T>(url, data, config);
    return response.data;
  } catch (error) {
    throw formatError(error);
  }
}

/**
 * DELETE request
 * @param url - API endpoint
 * @param config - Additional config
 * @returns Promise with data
 */
export async function apiDelete<T = any>(
  url: string,
  config?: Record<string, any>
): Promise<T> {
  try {
    const response = await apiClient.delete<T>(url, config);
    return response.data;
  } catch (error) {
    throw formatError(error);
  }
}

/**
 * Batch request (multiple parallel requests)
 * @param requests - Array of request functions
 * @returns Promise with all results
 */
export async function apiBatch<T = any>(
  requests: (() => Promise<any>)[]
): Promise<T[]> {
  try {
    const results = await Promise.all(requests.map((req) => req()));
    return results;
  } catch (error) {
    throw formatError(error);
  }
}

/**
 * Paginated GET request
 * @param url - API endpoint
 * @param page - Page number (default: 1)
 * @param limit - Items per page (default: 10)
 * @returns Promise with paginated data
 */
export async function apiGetPaginated<T = any>(
  url: string,
  page: number = 1,
  limit: number = 10
): Promise<T> {
  try {
    const response = await apiClient.get<T>(url, {
      params: { page, limit, offset: (page - 1) * limit },
    });
    return response.data;
  } catch (error) {
    throw formatError(error);
  }
}

/**
 * Upload file
 * @param url - API endpoint
 * @param file - File to upload
 * @param additionalData - Additional form data
 * @returns Promise with response
 */
export async function apiUploadFile<T = any>(
  url: string,
  file: File,
  additionalData?: Record<string, any>
): Promise<T> {
  try {
    const formData = new FormData();
    formData.append('file', file);

    if (additionalData) {
      Object.entries(additionalData).forEach(([key, value]) => {
        formData.append(key, String(value));
      });
    }

    const response = await apiClient.post<T>(url, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  } catch (error) {
    throw formatError(error);
  }
}

/**
 * Download file
 * @param url - API endpoint
 * @param filename - Filename for download
 */
export async function apiDownloadFile(url: string, filename: string): Promise<void> {
  try {
    const response = await apiClient.get(url, { responseType: 'blob' });
    const downloadUrl = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    link.parentNode?.removeChild(link);
    window.URL.revokeObjectURL(downloadUrl);
  } catch (error) {
    throw formatError(error);
  }
}

/**
 * Retry request with exponential backoff
 * @param fn - Function to retry
 * @param maxRetries - Maximum retry attempts (default: 3)
 * @param delay - Initial delay in ms (default: 1000)
 * @returns Promise with result
 */
export async function apiRetry<T = any>(
  fn: () => Promise<T>,
  maxRetries: number = 3,
  delay: number = 1000
): Promise<T> {
  let lastError: any;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;
      if (attempt < maxRetries) {
        const waitTime = delay * Math.pow(2, attempt);
        console.warn(
          `[API] Retry attempt ${attempt + 1}/${maxRetries} after ${waitTime}ms`
        );
        await new Promise((resolve) => setTimeout(resolve, waitTime));
      }
    }
  }

  throw lastError;
}

/**
 * Set authorization token
 * @param token - JWT token
 */
export function apiSetToken(token: string): void {
  localStorage.setItem('auth_token', token);
  apiClient.defaults.headers.common.Authorization = `Bearer ${token}`;
}

/**
 * Clear authorization token
 */
export function apiClearToken(): void {
  localStorage.removeItem('auth_token');
  delete apiClient.defaults.headers.common.Authorization;
}

/**
 * Get current authorization token
 */
export function apiGetToken(): string | null {
  return localStorage.getItem('auth_token');
}

/**
 * Set default headers
 * @param headers - Headers object
 */
export function apiSetHeaders(headers: Record<string, string>): void {
  Object.entries(headers).forEach(([key, value]) => {
    apiClient.defaults.headers.common[key] = value;
  });
}

/**
 * Get Axios instance for advanced usage
 */
export function getApiClient(): AxiosInstance {
  return apiClient;
}

export default apiClient;
