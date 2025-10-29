import { defineStore } from "pinia";
import { ref } from "vue";
import { useApi } from "../composables/useApi";

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
			// 確保只獲取啟用的案例研究
			const queryParams = {
				...params,
				isActive: true // 明確指定只獲取啟用的案例
			};

			// 後端列表 API：自帶權限過濾（公開只返回 isActive=true）
			const result = await caseStudyService.getAll(queryParams);
			console.log("API 返回的完整結果:", result);

			// 處理不同的資料結構：優先使用 caseStudies，其次使用 items
			const items = result.caseStudies || result.items || [];
			console.log("處理後的資料:", items);
			caseStudyList.value = items;

			if (result.pagination) {
				pagination.value = {
					page: result.pagination.current || result.pagination.page || pagination.value.page,
					limit: result.pagination.limit || pagination.value.limit,
					total: result.pagination.count || result.pagination.total || pagination.value.total,
					pages: result.pagination.total || result.pagination.pages || pagination.value.pages
				};
			}
			console.log("最終的 caseStudyList:", caseStudyList.value);
			console.log("最終的 pagination:", pagination.value);
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
			// 確保只獲取啟用的案例研究
			const queryParams = {
				...params,
				isActive: true // 明確指定只獲取啟用的案例
			};

			// 使用標準化的 getBySlug 方法
			const result = await caseStudyService.getBySlug(slug, queryParams);

			if (!result) {
				throw new Error("獲取案例研究詳情失敗：找不到項目");
			}

			// 處理不同的資料結構
			// 後端可能返回 { caseStudy: {...} } 或直接返回案例物件
			const caseStudyData = result.caseStudy || result;

			// 額外檢查案例是否啟用（雙重保護）
			if (caseStudyData && caseStudyData.isActive === false) {
				throw new Error("此案例研究目前不可用");
			}

			currentCaseStudy.value = caseStudyData;
			return currentCaseStudy.value;
		} catch (e: any) {
			console.error("獲取案例詳情失敗:", e);
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
			// 確保只獲取啟用的案例研究
			const queryParams = {
				...params,
				isActive: true // 明確指定只獲取啟用的案例
			};

			const result: any = await http.get(`/api/case-studies/project-type/${projectType}`, { params: queryParams });
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

		// 保留舊資料，直到新資料載入完成（避免閃爍）
		const previousData = [...caseStudyList.value];
		const previousPagination = { ...pagination.value };

		try {
			const searchParams = {
				q: searchTerm,
				...params,
				isActive: true // 確保搜尋結果只包含啟用的案例
			};
			const result: any = await http.get("/api/case-studies/search", { params: searchParams });

			// 只有成功獲取資料後才更新
			const newItems = result.caseStudies || result.items || [];

			// 更新案例列表
			caseStudyList.value = newItems;

			// 更新分頁資訊
			if (result.pagination) {
				pagination.value = {
					page: result.pagination.current || result.pagination.page || 1,
					limit: result.pagination.limit || 12,
					total: result.pagination.count || result.pagination.total || 0,
					pages: result.pagination.total || result.pagination.pages || 1
				};
			}

			return {
				items: newItems,
				pagination: result.pagination || null,
				searchTerm: result.searchTerm || searchTerm
			};
		} catch (e: any) {
			console.error("搜尋錯誤詳情:", e);
			error.value = e.message || "搜尋案例研究失敗";

			// 發生錯誤時，恢復之前的資料（而不是清空）
			caseStudyList.value = previousData;
			pagination.value = previousPagination;

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
