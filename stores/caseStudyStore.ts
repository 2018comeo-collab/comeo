import { defineStore } from "pinia";
import { ref } from "vue";
import { useApi } from "~/composables/useApi";

export const useCaseStudyStore = defineStore("caseStudy", () => {
	const { entityApi, http } = useApi();

	// 設定 entityType 為 'case-studies'，並根據 CaseStudyController.js 的 responseKey 設定為 'caseStudies'
	// 設定 requiresAuth 為 false，因為案例研究通常是公開的
	const caseStudyService = entityApi("case-studies", {
		responseKey: "caseStudies",
		requiresAuth: false
	});

	const caseStudyList = ref<any[]>([]);
	const currentCaseStudy = ref<any>(null);
	const pagination = ref({ page: 1, limit: 12, total: 0, pages: 0 });
	const isLoading = ref(false);
	const error = ref<string | null>(null);

	/**
	 * 獲取所有案例研究 (帶分頁)
	 * @param {Object} params - 查詢參數 (例如 { page: 1, limit: 10, projectType: 'web', isActive: true, search: 'keyword' })
	 */
	async function fetchAllCaseStudies(params = {}) {
		isLoading.value = true;
		error.value = null;
		try {
			// 後端列表 API：自帶權限過濾（公開只返回 isActive=true）
			const result = await caseStudyService.getAll(params);
			caseStudyList.value = result.items || [];
			if (result.pagination) {
				pagination.value = {
					page: result.pagination.current || result.pagination.page || pagination.value.page,
					limit: result.pagination.limit || pagination.value.limit,
					total: result.pagination.count || result.pagination.total || pagination.value.total,
					pages: result.pagination.total || result.pagination.pages || pagination.value.pages
				};
			}
		} catch (e: any) {
			error.value = e.message || "無法獲取案例研究列表";
			caseStudyList.value = [];
			pagination.value = { page: 1, limit: 12, total: 0, pages: 0 };
		} finally {
			isLoading.value = false;
		}
	}

	/**
	 * 根據 slug 獲取單個案例研究
	 * @param {string} slug - 案例研究的 slug
	 * @param {Object} params - 額外查詢參數
	 */
	async function fetchCaseStudyBySlug(slug: string, params = {}) {
		isLoading.value = true;
		error.value = null;
		try {
			// 使用標準化的 getBySlug 方法
			const result = await caseStudyService.getBySlug(slug, params);
			if (!result) {
				throw new Error("獲取案例研究詳情失敗：找不到項目");
			}
			currentCaseStudy.value = result;
			return currentCaseStudy.value;
		} catch (e: any) {
			error.value = e.message || "獲取案例研究詳情時發生錯誤";
			currentCaseStudy.value = null; // 確保出錯時清空
			throw e;
		} finally {
			isLoading.value = false;
		}
	}

	/**
	 * 根據專案類型獲取案例研究
	 * @param {string} projectType - 專案類型
	 * @param {Object} params - 查詢參數
	 */
	async function fetchCaseStudiesByProjectType(projectType: string, params = {}) {
		isLoading.value = true;
		error.value = null;
		try {
			const result: any = await http.get(`/api/case-studies/project-type/${projectType}`, { params });
			return result.caseStudies || [];
		} catch (e: any) {
			error.value = e.message || "獲取專案類型案例研究失敗";
			throw e;
		} finally {
			isLoading.value = false;
		}
	}

	/**
	 * 搜尋案例研究
	 * @param {string} searchTerm - 搜尋關鍵字
	 * @param {Object} params - 額外查詢參數
	 */
	async function searchCaseStudies(searchTerm: string, params = {}) {
		isLoading.value = true;
		error.value = null;
		try {
			const searchParams = {
				q: searchTerm,
				...params
			};
			const result: any = await http.get("/api/case-studies/search", { params: searchParams });

			return {
				items: result.caseStudies || [],
				pagination: result.pagination || null,
				searchTerm: result.searchTerm || searchTerm
			};
		} catch (e: any) {
			error.value = e.message || "搜尋案例研究失敗";
			throw e;
		} finally {
			isLoading.value = false;
		}
	}

	/**
	 * 清除當前案例研究
	 */
	function clearCurrentCaseStudy() {
		currentCaseStudy.value = null;
		error.value = null;
	}

	/**
	 * 清除錯誤狀態
	 */
	function clearError() {
		error.value = null;
	}

	return {
		// 狀態
		caseStudyList,
		currentCaseStudy,
		pagination,
		isLoading,
		error,

		// 方法
		fetchAllCaseStudies,
		fetchCaseStudyBySlug,
		fetchCaseStudiesByProjectType,
		searchCaseStudies,
		clearCurrentCaseStudy,
		clearError
	};
});
