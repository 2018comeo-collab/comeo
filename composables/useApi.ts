import axios, { type AxiosInstance, type AxiosRequestConfig, type AxiosResponse } from "axios";

export interface ApiResponse<T = any> {
	success: boolean;
	result: T;
	message?: string;
	pagination?: {
		page: number;
		limit: number;
		total: number;
		totalPages: number;
	};
}

export interface ApiError {
	message: string;
	status: number;
	data?: any;
}

export const useApi = () => {
	const config = useRuntimeConfig();

	// 建立基礎 API 實例
	const createApiInstance = (baseURL?: string): AxiosInstance => {
		return axios.create({
			baseURL: baseURL || config.public.apiBaseUrl,
			timeout: 10000,
			headers: {
				"Content-Type": "application/json"
			}
		});
	};

	// 建立認證 API 實例
	const createAuthApiInstance = (baseURL?: string): AxiosInstance => {
		const instance = createApiInstance(baseURL);

		// 請求攔截器 - 自動添加 API Key
		instance.interceptors.request.use((config) => {
			const runtimeConfig = useRuntimeConfig();
			const apiKey = runtimeConfig.apiKey;
			if (apiKey) {
				config.headers["X-API-Key"] = apiKey;
			}
			return config;
		});

		return instance;
	};

	// 基礎 API 實例
	const api = createApiInstance();

	// 認證 API 實例
	const apiAuth = createAuthApiInstance();

	/**
	 * 處理 API 回應格式
	 */
	const handleResponse = <T>(response: AxiosResponse<ApiResponse<T>>): T => {
		if (response.data?.success) {
			// 如果 API 回應有 result 欄位，使用它；否則直接返回整個 data
			return (response.data.result || response.data) as T;
		}
		throw new Error(response.data?.message || "API 請求失敗");
	};

	/**
	 * 處理 API 錯誤
	 */
	const handleError = (error: any): ApiError => {
		if (error.response) {
			return {
				message: error.response.data?.message || `HTTP ${error.response.status}`,
				status: error.response.status,
				data: error.response.data
			};
		} else if (error.request) {
			return {
				message: "網路請求失敗，請檢查網路連線",
				status: 0
			};
		} else {
			return {
				message: error.message || "未知錯誤",
				status: 0
			};
		}
	};

	/**
	 * 安全的 API 呼叫包裝器
	 */
	const safeApiCall = async <T>(
		apiCall: () => Promise<AxiosResponse<ApiResponse<T>>>,
		errorOptions: {
			onError?: (error: ApiError) => void;
			onFinally?: () => void;
		} = {}
	): Promise<T> => {
		try {
			const response = await apiCall();
			return handleResponse(response);
		} catch (error) {
			const apiError = handleError(error);

			// 記錄錯誤
			console.error("API 錯誤:", apiError);

			// 執行錯誤回調
			if (errorOptions.onError) {
				errorOptions.onError(apiError);
			}

			// 執行 finally 回調
			if (errorOptions.onFinally) {
				errorOptions.onFinally();
			}

			throw apiError;
		}
	};

	/**
	 * 實體 API 包裝器 - 提供標準的 CRUD 操作
	 */
	const entityApi = <T = any>(
		entityType: string,
		options: {
			requiresAuth?: boolean;
			responseKey?: string;
		} = {}
	) => {
		const { requiresAuth = false, responseKey } = options;
		const instance = requiresAuth ? apiAuth : api;
		const key = responseKey || `${entityType}List`;

		return {
			/**
			 * 獲取所有項目
			 */
			getAll: async (params: Record<string, any> = {}) => {
				const response = await safeApiCall<any>(() => instance.get(`/api/${entityType}`, { params }));
				// 如果設定了 responseKey，則使用該鍵名，否則使用預設的 items
				if (responseKey && response[responseKey]) {
					return {
						items: response[responseKey],
						pagination: response.pagination
					};
				}
				return response;
			},

			/**
			 * 根據 ID 獲取單個項目
			 */
			getById: async (id: string | number, params: Record<string, any> = {}) => {
				return safeApiCall<T>(() => instance.get(`/api/${entityType}/${id}`, { params }));
			},

			/**
			 * 根據 slug 獲取單個項目
			 */
			getBySlug: async (slug: string, params: Record<string, any> = {}) => {
				return safeApiCall<T>(() => instance.get(`/api/${entityType}/slug/${slug}`, { params }));
			},

			/**
			 * 搜索項目
			 */
			search: async (searchParams: Record<string, any> = {}) => {
				return safeApiCall<{ items: T[]; pagination?: any }>(() => instance.get(`/api/${entityType}/search`, { params: searchParams }));
			},

			/**
			 * 獲取分類列表
			 */
			getCategories: async () => {
				return safeApiCall<T[]>(() => instance.get(`/api/${entityType}/categories`));
			}
		};
	};

	/**
	 * 檔案服務 API
	 */
	const fileApi = {
		/**
		 * 上傳檔案
		 */
		upload: async (file: File, options: { folder?: string; resize?: boolean } = {}) => {
			const formData = new FormData();
			formData.append("file", file);

			if (options.folder) {
				formData.append("folder", options.folder);
			}

			return safeApiCall<{ url: string; filename: string }>(() =>
				apiAuth.post("/api/files/upload", formData, {
					headers: {
						"Content-Type": "multipart/form-data"
					}
				})
			);
		},

		/**
		 * 刪除檔案
		 */
		delete: async (filename: string) => {
			return safeApiCall<void>(() => apiAuth.delete(`/api/files/${filename}`));
		},

		/**
		 * 獲取檔案 URL
		 */
		getUrl: (filename: string): string => {
			const baseUrl = config.public.fileServiceBaseUrl || config.public.apiBaseUrl;
			return `${baseUrl}/files/${filename}`;
		}
	};

	/**
	 * 通用 HTTP 方法
	 */
	const http = {
		get: <T>(url: string, config?: AxiosRequestConfig) => safeApiCall<T>(() => api.get(url, config)),

		post: <T>(url: string, data?: any, config?: AxiosRequestConfig) => safeApiCall<T>(() => api.post(url, data, config)),

		put: <T>(url: string, data?: any, config?: AxiosRequestConfig) => safeApiCall<T>(() => api.put(url, data, config)),

		patch: <T>(url: string, data?: any, config?: AxiosRequestConfig) => safeApiCall<T>(() => api.patch(url, data, config)),

		delete: <T>(url: string, config?: AxiosRequestConfig) => safeApiCall<T>(() => api.delete(url, config))
	};

	/**
	 * 認證 HTTP 方法
	 */
	const httpAuth = {
		get: <T>(url: string, config?: AxiosRequestConfig) => safeApiCall<T>(() => apiAuth.get(url, config)),

		post: <T>(url: string, data?: any, config?: AxiosRequestConfig) => safeApiCall<T>(() => apiAuth.post(url, data, config)),

		put: <T>(url: string, data?: any, config?: AxiosRequestConfig) => safeApiCall<T>(() => apiAuth.put(url, data, config)),

		patch: <T>(url: string, data?: any, config?: AxiosRequestConfig) => safeApiCall<T>(() => apiAuth.patch(url, data, config)),

		delete: <T>(url: string, config?: AxiosRequestConfig) => safeApiCall<T>(() => apiAuth.delete(url, config))
	};

	return {
		// 實例
		api,
		apiAuth,

		// 工具方法
		safeApiCall,
		handleResponse,
		handleError,

		// 高階 API
		entityApi,
		fileApi,

		// HTTP 方法
		http,
		httpAuth
	};
};
