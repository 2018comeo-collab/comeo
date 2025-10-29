import { ref } from "vue";
import { useApi } from "~/composables/useApi";

export interface ContactFormData {
	name: string;
	phone: string;
	email: string;
	company?: string;
	subject: string;
	type: string[];
	details: string;
	files?: File[];
}

export interface ContactResponse {
	success: boolean;
	message: string;
}

export const useContact = () => {
	const { api, safeApiCall } = useApi();

	const isSubmitting = ref(false);
	const submitError = ref<string | null>(null);

	/**
	 * 提交聯絡表單
	 * @param {ContactFormData} formData - 表單資料
	 * @returns {Promise<ContactResponse>} 提交結果
	 */
	const submitContactForm = async (formData: ContactFormData): Promise<ContactResponse> => {
		isSubmitting.value = true;
		submitError.value = null;

		try {
			// 建立 FormData 物件
			const formDataObj = new FormData();

			// 添加文字欄位
			formDataObj.append("name", formData.name);
			formDataObj.append("phone", formData.phone);
			formDataObj.append("email", formData.email);
			formDataObj.append("company", formData.company || "");
			formDataObj.append("subject", formData.subject);
			formDataObj.append("details", formData.details);

			// 添加需求類型 (支援多選)
			formData.type.forEach((typeOption) => {
				formDataObj.append("type", typeOption);
			});

			// 添加檔案 (如果有)
			if (formData.files && formData.files.length > 0) {
				formData.files.forEach((file) => {
					formDataObj.append("files", file);
				});
			}

			// 發送請求
			const response = await safeApiCall<ContactResponse>(
				() =>
					api.post("/api/contact", formDataObj, {
						headers: {
							"Content-Type": "multipart/form-data"
						}
					}),
				{
					onError: (error) => {
						console.error("聯絡表單提交錯誤:", error);
						submitError.value = error.message;
					}
				}
			);

			return response;
		} catch (error) {
			console.error("聯絡表單提交失敗:", error);
			throw error;
		} finally {
			isSubmitting.value = false;
		}
	};

	/**
	 * 驗證聯絡表單資料
	 * @param {ContactFormData} formData - 表單資料
	 * @returns {Object} 驗證結果
	 */
	const validateContactForm = (formData: ContactFormData): { isValid: boolean; errors: Record<string, string> } => {
		const errors: Record<string, string> = {};

		// 驗證必填欄位
		if (!formData.name || formData.name.trim().length === 0) {
			errors.name = "姓名為必填欄位";
		}

		if (!formData.phone || formData.phone.trim().length === 0) {
			errors.phone = "聯絡電話為必填欄位";
		}

		if (!formData.email || formData.email.trim().length === 0) {
			errors.email = "電子信箱為必填欄位";
		} else if (!formData.email.includes("@")) {
			errors.email = "請輸入有效的電子信箱格式";
		}

		if (!formData.subject || formData.subject.trim().length === 0) {
			errors.subject = "聯絡主旨為必填欄位";
		}

		if (!formData.type || formData.type.length === 0) {
			errors.type = "請至少選擇一個需求類型";
		}

		if (!formData.details || formData.details.trim().length === 0) {
			errors.details = "詳細說明為必填欄位";
		}

		// 驗證檔案 (如果有)
		if (formData.files && formData.files.length > 0) {
			const maxFileSize = 5 * 1024 * 1024; // 5MB
			const allowedTypes = [
				"image/jpeg",
				"image/png",
				"image/gif",
				"application/pdf",
				"application/msword",
				"application/vnd.openxmlformats-officedocument.wordprocessingml.document",
				"application/vnd.ms-excel",
				"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
			];

			if (formData.files.length > 3) {
				errors.files = "最多只能上傳 3 個檔案";
			}

			formData.files.forEach((file, index) => {
				if (file.size > maxFileSize) {
					errors.files = `檔案 ${file.name} 大小超過 5MB 限制`;
				}
				if (!allowedTypes.includes(file.type)) {
					errors.files = `檔案 ${file.name} 格式不支援`;
				}
			});
		}

		return {
			isValid: Object.keys(errors).length === 0,
			errors
		};
	};

	/**
	 * 清除錯誤狀態
	 */
	const clearError = () => {
		submitError.value = null;
	};

	/**
	 * 重置表單狀態
	 */
	const resetForm = () => {
		isSubmitting.value = false;
		submitError.value = null;
	};

	/**
	 * 提交簡化版聯絡表單 (適用於 ContactSection.vue)
	 * @param {Object} formData - 簡化的表單資料
	 * @returns {Promise<ContactResponse>} 提交結果
	 */
	const submitSimpleContactForm = async (formData: {
		name: string;
		phone: string;
		email: string;
		company?: string;
		message: string;
		files?: File[];
		siteType?: string;
	}): Promise<ContactResponse> => {
		const contactFormData: ContactFormData = {
			name: formData.name,
			phone: formData.phone,
			email: formData.email,
			company: formData.company || "",
			subject: "蝶蛹諮詢表單",
			type: ["合作諮詢"],
			details: formData.message,
			files: formData.files || []
		};

		// 如果有 siteType，直接使用帶 header 的 API 呼叫
		if (formData.siteType) {
			return submitContactFormWithSiteType(contactFormData, formData.siteType);
		}

		return submitContactForm(contactFormData);
	};

	/**
	 * 帶網站類型的聯絡表單提交
	 * @param {ContactFormData} formData - 表單資料
	 * @param {string} siteType - 網站類型
	 * @returns {Promise<ContactResponse>} 提交結果
	 */
	const submitContactFormWithSiteType = async (formData: ContactFormData, siteType: string): Promise<ContactResponse> => {
		isSubmitting.value = true;
		submitError.value = null;

		try {
			const formDataObj = new FormData();
			formDataObj.append("name", formData.name);
			formDataObj.append("phone", formData.phone);
			formDataObj.append("email", formData.email);
			formDataObj.append("company", formData.company || "");
			formDataObj.append("subject", formData.subject);
			formDataObj.append("details", formData.details);

			// 添加需求類型 (支援多選)
			formData.type.forEach((typeOption) => {
				formDataObj.append("type", typeOption);
			});

			// 添加檔案 (如果有)
			if (formData.files && formData.files.length > 0) {
				formData.files.forEach((file) => {
					formDataObj.append("files", file);
				});
			}

			// 發送請求，添加 x-app-context header
			const response = await safeApiCall<ContactResponse>(
				() =>
					api.post("/api/contact", formDataObj, {
						headers: {
							"Content-Type": "multipart/form-data",
							"x-app-context": siteType
						}
					}),
				{
					onError: (error) => {
						console.error("聯絡表單提交錯誤:", error);
						submitError.value = error.message;
					}
				}
			);

			return response;
		} catch (error) {
			console.error("聯絡表單提交失敗:", error);
			throw error;
		} finally {
			isSubmitting.value = false;
		}
	};

	return {
		// 狀態
		isSubmitting,
		submitError,

		// 方法
		submitContactForm,
		submitSimpleContactForm,
		validateContactForm,
		clearError,
		resetForm
	};
};
