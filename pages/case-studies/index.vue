<template>
	<div class="min-h-screen bg-gray-50">
		<!-- 頁面標題 -->
		<section class="bg-white py-16">
			<div class="container mx-auto px-4">
				<h1 class="text-4xl md:text-6xl font-bold text-center text-gray-900 mb-4">成功案例</h1>
				<p class="text-lg text-center text-gray-600 max-w-2xl mx-auto">探索我們為客戶創造的創新解決方案和卓越成果</p>
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
								class="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
								@keyup.enter="handleSearch"
							/>
							<div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
								<svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
								</svg>
							</div>
						</div>
					</div>

					<!-- 專案類型篩選 -->
					<div class="flex gap-2 flex-wrap">
						<button
							v-for="type in projectTypes"
							:key="type"
							@click="
								selectedProjectType = type;
								fetchCaseStudies();
							"
							:class="[
								'px-4 py-2 rounded-full text-sm font-medium transition-colors',
								selectedProjectType === type ? 'bg-emerald-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
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
				<!-- 載入狀態 -->
				<div v-if="isLoading" class="flex justify-center items-center py-12">
					<div class="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500"></div>
				</div>

				<!-- 錯誤狀態 -->
				<div v-else-if="error" class="text-center py-12">
					<div class="text-red-500 mb-4">{{ error }}</div>
					<button @click="fetchCaseStudies" class="px-6 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors">重新載入</button>
				</div>

				<!-- 案例研究網格 -->
				<div v-else-if="caseStudyList.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
					<div v-for="caseStudy in caseStudyList" :key="caseStudy._id" class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
						<!-- 案例圖片 -->
						<div v-if="caseStudy.images && caseStudy.images.length > 0" class="aspect-video bg-gray-200">
							<img :src="caseStudy.images[0]" :alt="caseStudy.title" class="w-full h-full object-cover" />
						</div>
						<div v-else class="aspect-video bg-gradient-to-br from-emerald-100 to-emerald-200 flex items-center justify-center">
							<svg class="w-16 h-16 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
								/>
							</svg>
						</div>

						<!-- 案例內容 -->
						<div class="p-6">
							<!-- 專案類型標籤 -->
							<span class="inline-block px-3 py-1 bg-emerald-100 text-emerald-700 text-sm font-medium rounded-full mb-3">
								{{ caseStudy.projectType }}
							</span>

							<!-- 標題 -->
							<h3 class="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
								{{ caseStudy.title }}
							</h3>

							<!-- 描述 -->
							<p class="text-gray-600 mb-4 line-clamp-3">
								{{ caseStudy.description }}
							</p>

							<!-- 解決方案預覽 -->
							<div v-if="caseStudy.solutions && caseStudy.solutions.length > 0" class="mb-4">
								<h4 class="text-sm font-semibold text-gray-700 mb-2">解決方案:</h4>
								<ul class="text-sm text-gray-600 space-y-1">
									<li v-for="(solution, index) in caseStudy.solutions.slice(0, 2)" :key="index" class="flex items-start">
										<span class="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
										{{ solution }}
									</li>
									<li v-if="caseStudy.solutions.length > 2" class="text-emerald-600 text-xs">+{{ caseStudy.solutions.length - 2 }} 更多...</li>
								</ul>
							</div>

							<!-- 查看詳情按鈕 -->
							<NuxtLink
								:to="`/case-studies/${caseStudy.slug}`"
								class="inline-flex items-center px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors"
							>
								查看詳情
								<svg class="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
								</svg>
							</NuxtLink>
						</div>
					</div>
				</div>

				<!-- 空狀態 -->
				<div v-else class="text-center py-12">
					<div class="text-gray-500 mb-4">目前沒有找到案例研究</div>
					<button @click="fetchCaseStudies" class="px-6 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors">重新載入</button>
				</div>

				<!-- 分頁 -->
				<div v-if="caseStudyList.length > 0 && pagination.pages > 1" class="flex justify-center mt-12">
					<div class="flex gap-2">
						<button
							v-for="page in pagination.pages"
							:key="page"
							@click="goToPage(page)"
							:class="[
								'px-4 py-2 rounded-lg text-sm font-medium transition-colors',
								page === pagination.page ? 'bg-emerald-500 text-white' : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
							]"
						>
							{{ page }}
						</button>
					</div>
				</div>
			</div>
		</section>
	</div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useCaseStudyStore } from "~/stores/caseStudyStore";

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

// 從 store 解構狀態
const { caseStudyList, pagination, isLoading, error, fetchAllCaseStudies, searchCaseStudies } = caseStudyStore;

// 專案類型選項
const projectTypes = ref(["全部", "網站開發", "應用程式", "系統整合", "顧問服務"]);

// 獲取案例研究列表
const fetchCaseStudies = async () => {
	const params = {
		page: pagination.value.page,
		limit: pagination.value.limit
	};

	if (selectedProjectType.value !== "全部") {
		params.projectType = selectedProjectType.value;
	}

	await fetchAllCaseStudies(params);
};

// 搜尋功能
const handleSearch = async () => {
	if (!searchQuery.value.trim()) {
		await fetchCaseStudies();
		return;
	}

	try {
		await searchCaseStudies(searchQuery.value.trim(), {
			page: 1,
			limit: pagination.value.limit
		});
	} catch (error) {
		console.error("搜尋失敗:", error);
	}
};

// 分頁功能
const goToPage = async (page) => {
	pagination.value.page = page;
	await fetchCaseStudies();
};

// 組件掛載時載入資料
onMounted(() => {
	fetchCaseStudies();
});
</script>

<style scoped>
.line-clamp-2 {
	display: -webkit-box;
	-webkit-line-clamp: 2;
	-webkit-box-orient: vertical;
	overflow: hidden;
}

.line-clamp-3 {
	display: -webkit-box;
	-webkit-line-clamp: 3;
	-webkit-box-orient: vertical;
	overflow: hidden;
}
</style>
