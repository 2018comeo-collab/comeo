<template>
	<div class="min-h-screen bg-gray-50">
		<!-- 頁面標題 -->
		<section class="bg-white pt-24 md:pt-28 pb-16 border-b">
			<div class="container mx-auto px-4">
				<h1 class="text-4xl md:text-5xl lg:text-6xl font-black text-center text-gray-900 mb-4">實績案例</h1>
				<p class="text-lg md:text-xl text-center text-gray-600 max-w-2xl mx-auto">成功案例見證我們的專業實力</p>
			</div>
		</section>

		<!-- 搜尋和篩選 -->
		<section class="py-8 bg-white border-b">
			<div class="container mx-auto px-4">
				<div class="flex flex-col md:flex-row gap-4 items-center justify-between">
					<!-- 搜尋框 -->
					<div class="flex-1 max-w-md">
						<div class="relative">
							<input
								v-model="searchQuery"
								type="text"
								placeholder="搜尋案例研究..."
								class="w-full px-4 py-2 pl-10 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-orange focus:border-brand-orange transition-all"
								@input="handleSearch"
								@keyup.enter="handleSearch"
							/>
							<div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
								<svg v-if="!isSearching" class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
								</svg>
								<!-- 搜尋中的載入動畫 -->
								<div v-else class="h-5 w-5">
									<svg class="animate-spin text-brand-orange" fill="none" viewBox="0 0 24 24">
										<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
										<path
											class="opacity-75"
											fill="currentColor"
											d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
										></path>
									</svg>
								</div>
							</div>
							<!-- 清除按鈕 -->
							<button
								v-if="searchQuery"
								@click="clearSearch"
								class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-brand-orange transition-colors"
								type="button"
								aria-label="清除搜尋"
							>
								<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
								</svg>
							</button>
						</div>
					</div>

					<!-- 專案類型篩選 -->
					<div class="bg-white rounded-2xl p-2 shadow-lg border border-gray-200 inline-flex gap-2 flex-wrap">
						<button
							v-for="type in projectTypes"
							:key="type"
							@click="selectProjectType(type)"
							:class="[
								'px-6 py-3 rounded-xl font-semibold transition-all duration-300',
								selectedProjectType === type ? 'bg-brand-orange text-white shadow-md' : 'text-gray-600 hover:text-brand-orange hover:bg-orange-50'
							]"
						>
							{{ type }}
						</button>
					</div>
				</div>
			</div>
		</section>

		<!-- 案例研究列表 -->
		<section class="py-12">
			<div class="container mx-auto px-4">
				<!-- 載入骨架屏 - 首次載入或延遲載入時顯示 -->
				<div v-if="(isLoading || showLoadingDelay) && filteredCaseStudyList.length === 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
					<div v-for="n in 6" :key="n" class="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden animate-pulse">
						<!-- 骨架圖片 -->
						<div class="aspect-video bg-gray-200"></div>
						<!-- 骨架內容 -->
						<div class="p-6">
							<div class="h-6 bg-gray-200 rounded mb-3"></div>
							<div class="h-4 bg-gray-200 rounded mb-2"></div>
							<div class="h-4 bg-gray-200 rounded mb-2"></div>
							<div class="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
							<div class="flex gap-2 mb-4">
								<div class="h-8 bg-gray-200 rounded-full w-20"></div>
								<div class="h-8 bg-gray-200 rounded-full w-24"></div>
							</div>
							<div class="h-12 bg-gray-200 rounded-lg w-full"></div>
						</div>
					</div>
				</div>

				<!-- 錯誤狀態 -->
				<div v-else-if="error" class="text-center py-12">
					<div class="max-w-md mx-auto">
						<div class="w-16 h-16 mx-auto mb-4 text-red-500">
							<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" class="w-full h-full">
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
								/>
							</svg>
						</div>
						<h3 class="text-lg font-semibold text-gray-900 mb-2">載入失敗</h3>
						<p class="text-gray-600 mb-4">{{ error }}</p>
						<button @click="fetchCaseStudies" class="px-6 py-2 bg-brand-orange text-white rounded-lg hover:bg-orange-600 transition-colors">重新載入</button>
					</div>
				</div>

				<!-- 空狀態 - 沒有載入中、沒有錯誤、也沒有資料時顯示（且非初始載入） -->
				<div v-else-if="!isLoading && !showLoadingDelay && !error && !isInitialLoad && filteredCaseStudyList.length === 0" class="text-center py-12">
					<div class="max-w-md mx-auto">
						<div class="w-16 h-16 mx-auto mb-4 text-gray-400">
							<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" class="w-full h-full">
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
								/>
							</svg>
						</div>
						<h3 class="text-lg font-semibold text-gray-900 mb-2">目前沒有找到案例研究</h3>
						<p class="text-gray-600 mb-4">請嘗試調整搜尋條件或篩選器</p>
						<button @click="resetFilters" class="px-6 py-2 bg-brand-orange text-white rounded-lg hover:bg-orange-600 transition-colors">顯示全部案例</button>
					</div>
				</div>

				<!-- 案例研究網格 -->
				<div v-else-if="filteredCaseStudyList.length > 0" class="relative">
					<!-- 搜尋中的微妙覆蓋層 -->
					<transition name="fade">
						<div
							v-if="isSearching && filteredCaseStudyList.length > 0"
							class="absolute inset-0 bg-white/60 backdrop-blur-[2px] z-10 flex items-start justify-center pt-20 pointer-events-none rounded-lg"
						>
							<div class="bg-white shadow-lg rounded-full px-4 py-2 flex items-center gap-2">
								<svg class="animate-spin h-4 w-4 text-brand-orange" fill="none" viewBox="0 0 24 24">
									<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
									<path
										class="opacity-75"
										fill="currentColor"
										d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
									></path>
								</svg>
								<span class="text-sm text-gray-600 font-medium">搜尋中...</span>
							</div>
						</div>
					</transition>

					<!-- 案例卡片網格 -->
					<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
						<div
							v-for="caseStudy in filteredCaseStudyList"
							:key="caseStudy._id"
							class="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-200 group"
							role="article"
							:aria-label="`案例研究：${caseStudy.title}`"
						>
							<!-- 案例圖片 -->
							<div class="aspect-video bg-gradient-to-br from-brand-orange/20 to-brand-red/20 relative overflow-hidden">
								<!-- 如果有圖片，顯示圖片 -->
								<img
									v-if="caseStudy.images && caseStudy.images.length > 0"
									:src="getImageUrl(caseStudy.images[0])"
									:alt="caseStudy.title"
									class="w-full h-full object-cover transition-opacity duration-300"
									loading="lazy"
									decoding="async"
									@error="handleImageError"
									@load="handleImageLoad"
								/>
								<!-- 預設內容 - 當沒有圖片或圖片載入失敗時顯示 -->
								<div
									class="image-fallback absolute inset-0 flex items-center justify-center"
									:style="{ display: !caseStudy.images || caseStudy.images.length === 0 ? 'flex' : 'none' }"
								>
									<div class="text-center">
										<svg class="w-16 h-16 text-brand-orange mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path
												stroke-linecap="round"
												stroke-linejoin="round"
												stroke-width="2"
												d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
											/>
										</svg>
										<p class="text-brand-orange text-sm font-medium">案例圖片</p>
									</div>
								</div>
								<!-- 專案類型標籤 -->
								<div class="absolute top-4 left-4">
									<span class="bg-white/90 text-brand-orange px-3 py-1 rounded-full text-sm font-semibold">
										{{ caseStudy.projectType }}
									</span>
								</div>
							</div>

							<!-- 案例內容 -->
							<div class="p-6">
								<!-- 標題 -->
								<h3 class="text-xl font-bold text-gray-900 mb-3 group-hover:text-brand-orange transition-colors">
									{{ caseStudy.title }}
								</h3>

								<!-- 描述 -->
								<p class="text-gray-600 mb-4 leading-relaxed line-clamp-4">
									{{ caseStudy.description }}
								</p>

								<!-- 解決方案標籤 -->
								<div v-if="caseStudy.solutions && caseStudy.solutions.length > 0" class="mb-4">
									<h4 class="text-sm font-semibold text-gray-700 mb-2">解決方案</h4>
									<div class="flex flex-wrap gap-2">
										<span
											v-for="(solution, index) in caseStudy.solutions.slice(0, 3)"
											:key="index"
											class="bg-gradient-to-r from-brand-orange/10 to-brand-red/10 text-brand-orange px-3 py-1.5 rounded-full text-sm font-medium border border-brand-orange/20 hover:from-brand-orange/20 hover:to-brand-red/20 transition-all duration-200"
										>
											{{ solution }}
										</span>
										<span
											v-if="caseStudy.solutions.length > 3"
											class="bg-gradient-to-r from-brand-orange/10 to-brand-red/10 text-brand-orange px-3 py-1.5 rounded-full text-sm font-medium border border-brand-orange/20"
										>
											+{{ caseStudy.solutions.length - 3 }}
										</span>
									</div>
								</div>

								<!-- 查看詳情按鈕 -->
								<NuxtLink
									:to="`/case-studies/${caseStudy.slug || caseStudy._id}`"
									class="w-full inline-block bg-gradient-to-r from-brand-orange to-brand-red text-white font-semibold py-3 rounded-lg hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 text-center"
								>
									查看詳情
								</NuxtLink>
							</div>
						</div>
					</div>
				</div>

				<!-- 分頁 -->
				<div v-if="filteredCaseStudyList.length > 0" class="flex flex-col items-center mt-12 space-y-4">
					<!-- 分頁資訊 -->
					<div class="text-sm text-gray-600">
						第 {{ pagination.page }} 頁，共 {{ pagination.pages }} 頁
						<span v-if="pagination.total > 0" class="text-gray-500"> （共 {{ pagination.total }} 個案例） </span>
					</div>

					<!-- 分頁控制 -->
					<nav v-if="pagination.pages > 1" aria-label="分頁導航" class="flex items-center gap-2">
						<!-- 上一頁按鈕 -->
						<button
							@click="goToPage(pagination.page - 1)"
							:disabled="pagination.page <= 1"
							:class="[
								'px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 shadow-md',
								pagination.page <= 1
									? 'bg-gray-100 text-gray-400 cursor-not-allowed'
									: 'bg-white text-gray-700 hover:bg-orange-50 hover:text-brand-orange border border-gray-200'
							]"
							aria-label="上一頁"
						>
							<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
							</svg>
						</button>

						<!-- 頁碼按鈕 -->
						<template v-for="page in getVisiblePages()" :key="page">
							<button
								v-if="page !== '...'"
								@click="goToPage(page)"
								:class="[
									'px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 shadow-md',
									page === pagination.page
										? 'bg-brand-orange text-white'
										: 'bg-white text-gray-700 hover:bg-orange-50 hover:text-brand-orange border border-gray-200'
								]"
								:aria-current="page === pagination.page ? 'page' : undefined"
								:aria-label="`前往第 ${page} 頁`"
							>
								{{ page }}
							</button>
							<span v-else class="px-2 py-2 text-gray-500">...</span>
						</template>

						<!-- 下一頁按鈕 -->
						<button
							@click="goToPage(pagination.page + 1)"
							:disabled="pagination.page >= pagination.pages"
							:class="[
								'px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 shadow-md',
								pagination.page >= pagination.pages
									? 'bg-gray-100 text-gray-400 cursor-not-allowed'
									: 'bg-white text-gray-700 hover:bg-orange-50 hover:text-brand-orange border border-gray-200'
							]"
							aria-label="下一頁"
						>
							<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
							</svg>
						</button>
					</nav>
				</div>
			</div>
		</section>
	</div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";
import { useCaseStudyStore } from "~/stores/caseStudyStore";
import { storeToRefs } from "pinia";

// 使用 default 佈局並隱藏中間導航連結
definePageMeta({
	layout: "default",
	hideNavLinks: true
});

// 設定頁面標題和 SEO
useHead({
	title: "成功案例 - 蝶蛹科技",
	meta: [
		{
			name: "description",
			content: "探索蝶蛹科技為客戶創造的創新解決方案和卓越成果，了解我們的專業能力和成功經驗。"
		}
	]
});

const caseStudyStore = useCaseStudyStore();

// 響應式資料
const searchQuery = ref("");
const selectedProjectType = ref("全部");
const searchTimeout = ref(null);
const isSearching = ref(false); // 搜尋中狀態
const showLoadingDelay = ref(false); // 延遲顯示載入狀態
const isInitialLoad = ref(true); // 初始載入標記，防止空狀態閃爍
const hasSearched = ref(false); // 標記是否曾經搜尋過

// 從 store 解構狀態 - 使用 storeToRefs 確保響應式
const { caseStudyList, isLoading, error } = storeToRefs(caseStudyStore);
const { fetchAllCaseStudies, searchCaseStudies } = caseStudyStore;

// 常數定義
const allProjectTypes = ["智慧建築", "系統整合", "安全監控"];
const ITEMS_PER_PAGE = 12;
const SEARCH_DEBOUNCE_MS = 500;

// 本地分頁狀態
const currentPage = ref(1);

// 過濾掉未啟用的案例，並根據選擇的專案類型篩選
const filteredByType = computed(() => {
	let filtered = caseStudyList.value.filter((caseStudy) => caseStudy.isActive !== false);

	// 如果選擇了特定類型，進行篩選
	if (selectedProjectType.value !== "全部") {
		filtered = filtered.filter((caseStudy) => caseStudy.projectType === selectedProjectType.value);
	}

	return filtered;
});

// 根據篩選和分頁的最終案例列表
const filteredCaseStudyList = computed(() => {
	const start = (currentPage.value - 1) * ITEMS_PER_PAGE;
	const end = start + ITEMS_PER_PAGE;
	return filteredByType.value.slice(start, end);
});

// 本地分頁資訊
const pagination = computed(() => {
	const total = filteredByType.value.length;
	const pages = Math.ceil(total / ITEMS_PER_PAGE);
	return {
		page: currentPage.value,
		pages: pages,
		total: total,
		limit: ITEMS_PER_PAGE
	};
});

// 專案類型選項 - 動態生成，只顯示有資料的類別
const projectTypes = computed(() => {
	// 獲取所有啟用案例的專案類型
	const availableTypes = new Set(
		caseStudyList.value
			.filter((cs) => cs.isActive !== false)
			.map((cs) => cs.projectType)
			.filter((type) => !!type)
	);

	// 篩選出有資料的類型
	const activeTypes = allProjectTypes.filter((type) => availableTypes.has(type));

	// 始終在最前面加上「全部」
	return ["全部", ...activeTypes];
});

// 初始載入所有案例（不分頁，一次性載入）
const fetchCaseStudies = async () => {
	await fetchAllCaseStudies({
		isActive: true, // 明確指定只獲取啟用的案例
		limit: 1000 // 設定一個較大的數字以獲取所有案例
	});
	isInitialLoad.value = false;
};

// 切換專案類型篩選
const selectProjectType = (type) => {
	selectedProjectType.value = type;
	currentPage.value = 1; // 切換類型時重置頁碼
};

// 清除搜尋並重新載入資料（如果需要）
const clearSearchAndReload = async () => {
	if (hasSearched.value) {
		await fetchCaseStudies();
		hasSearched.value = false;
	}
};

// 清除搜尋
const clearSearch = async () => {
	searchQuery.value = "";
	currentPage.value = 1;
	await clearSearchAndReload();
};

// 重置所有篩選條件
const resetFilters = async () => {
	searchQuery.value = "";
	selectProjectType("全部");
	currentPage.value = 1;
	await clearSearchAndReload();
};

// 搜尋功能 - 優化防抖動與載入體驗
const handleSearch = async () => {
	// 清除之前的定時器
	if (searchTimeout.value) {
		clearTimeout(searchTimeout.value);
	}

	// 設置新的定時器，延遲後執行搜尋
	searchTimeout.value = setTimeout(async () => {
		isSearching.value = true;
		currentPage.value = 1; // 搜尋時重置頁碼

		// 延遲顯示載入狀態（避免閃爍）
		const loadingTimer = setTimeout(() => {
			showLoadingDelay.value = true;
		}, SEARCH_DEBOUNCE_MS);

		try {
			if (!searchQuery.value.trim()) {
				// 如果搜尋框為空，且曾經搜尋過，則重新載入所有案例
				if (hasSearched.value) {
					await fetchCaseStudies();
					hasSearched.value = false;
				}
			} else {
				// 嘗試使用後端搜尋
				await searchCaseStudies(searchQuery.value.trim(), {
					page: 1,
					limit: 1000, // 搜尋時也獲取所有結果
					isActive: true // 確保搜尋結果只包含啟用的案例
				});
				hasSearched.value = true; // 標記已經進行過搜尋
			}
		} catch (error) {
			console.error("搜尋失敗，將使用一般列表:", error);
			// 如果搜尋失敗，回退到一般列表
			await fetchCaseStudies();
		} finally {
			clearTimeout(loadingTimer);
			isSearching.value = false;
			showLoadingDelay.value = false;
			isInitialLoad.value = false; // 搜尋完成後標記為非初始載入
		}
	}, SEARCH_DEBOUNCE_MS);
};

// 分頁功能（前端分頁）
const goToPage = (page) => {
	currentPage.value = page;
	// 滾動到頂部以便查看新內容
	window.scrollTo({ top: 0, behavior: "smooth" });
};

// 獲取可見的頁碼（智能分頁顯示）
const getVisiblePages = () => {
	const current = pagination.value?.page || 1;
	const total = pagination.value?.pages || 1;
	const pages = [];

	// 如果總頁數少於等於 7，顯示所有頁碼
	if (total <= 7) {
		for (let i = 1; i <= total; i++) {
			pages.push(i);
		}
		return pages;
	}

	// 總是顯示第一頁
	pages.push(1);

	if (current <= 4) {
		// 當前頁在前 4 頁，顯示 1, 2, 3, 4, 5, ..., 最後一頁
		for (let i = 2; i <= 5; i++) {
			pages.push(i);
		}
		pages.push("...");
		pages.push(total);
	} else if (current >= total - 3) {
		// 當前頁在後 4 頁，顯示 1, ..., 倒數 5 頁
		pages.push("...");
		for (let i = total - 4; i <= total; i++) {
			pages.push(i);
		}
	} else {
		// 當前頁在中間，顯示 1, ..., 當前頁前後各 1 頁, ..., 最後一頁
		pages.push("...");
		pages.push(current - 1);
		pages.push(current);
		pages.push(current + 1);
		pages.push("...");
		pages.push(total);
	}

	return pages;
};

// 圖片處理函數
const getImageUrl = (imageUrl) => {
	if (!imageUrl) return "";
	if (imageUrl.startsWith("http")) return imageUrl;
	return `${useRuntimeConfig().public.apiBaseUrl || "/api"}${imageUrl}`;
};

// 處理圖片載入錯誤
const handleImageError = (event) => {
	const img = event.target;
	img.style.display = "none";
	const container = img.closest(".aspect-video");
	const fallback = container?.querySelector(".image-fallback");
	if (fallback) fallback.style.display = "flex";
};

// 處理圖片載入成功
const handleImageLoad = (event) => {
	const img = event.target;
	img.style.opacity = "1";
	const container = img.closest(".aspect-video");
	const fallback = container?.querySelector(".image-fallback");
	if (fallback) fallback.style.display = "none";
};

// 組件掛載時載入資料
onMounted(() => {
	fetchCaseStudies();
});

// 組件卸載時清理定時器
onUnmounted(() => {
	if (searchTimeout.value) {
		clearTimeout(searchTimeout.value);
	}
});
</script>

<style scoped>
.line-clamp-2 {
	display: -webkit-box;
	-webkit-line-clamp: 2;
	line-clamp: 2;
	-webkit-box-orient: vertical;
	overflow: hidden;
}

.line-clamp-3 {
	display: -webkit-box;
	-webkit-line-clamp: 3;
	line-clamp: 3;
	-webkit-box-orient: vertical;
	overflow: hidden;
}

.line-clamp-4 {
	display: -webkit-box;
	-webkit-line-clamp: 4;
	line-clamp: 4;
	-webkit-box-orient: vertical;
	overflow: hidden;
}

/* 淡入淡出過渡效果 */
.fade-enter-active,
.fade-leave-active {
	transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
	opacity: 0;
}

.fade-enter-to,
.fade-leave-from {
	opacity: 1;
}
</style>
