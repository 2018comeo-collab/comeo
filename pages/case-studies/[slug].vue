<template>
	<div class="min-h-screen bg-gray-50">
		<!-- 載入狀態 -->
		<div v-if="isLoading" class="flex justify-center items-center min-h-screen">
			<div class="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500"></div>
		</div>

		<!-- 錯誤狀態 -->
		<div v-else-if="error" class="flex flex-col items-center justify-center min-h-screen">
			<div class="text-red-500 mb-4">{{ error }}</div>
			<NuxtLink to="/case-studies" class="px-6 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors"> 返回案例列表 </NuxtLink>
		</div>

		<!-- 案例詳情內容 -->
		<div v-else-if="currentCaseStudy" class="bg-white">
			<!-- 案例標題區域 -->
			<section class="bg-gradient-to-r from-emerald-50 to-green-50 py-16">
				<div class="container mx-auto px-4">
					<div class="max-w-4xl mx-auto">
						<!-- 返回按鈕 -->
						<NuxtLink to="/case-studies" class="inline-flex items-center text-emerald-600 hover:text-emerald-700 mb-6 transition-colors">
							<svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
							</svg>
							返回案例列表
						</NuxtLink>

						<!-- 專案類型標籤 -->
						<span class="inline-block px-4 py-2 bg-emerald-100 text-emerald-700 text-sm font-medium rounded-full mb-4">
							{{ currentCaseStudy.projectType }}
						</span>

						<!-- 案例標題 -->
						<h1 class="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
							{{ currentCaseStudy.title }}
						</h1>

						<!-- 案例描述 -->
						<p class="text-xl text-gray-600 leading-relaxed">
							{{ currentCaseStudy.description }}
						</p>

						<!-- 案例資訊 -->
						<div class="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
							<div v-if="currentCaseStudy.author" class="flex items-center">
								<svg class="w-5 h-5 text-emerald-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
									/>
								</svg>
								<div>
									<div class="text-sm text-gray-500">專案負責人</div>
									<div class="font-medium text-gray-900">{{ currentCaseStudy.author }}</div>
								</div>
							</div>

							<div v-if="currentCaseStudy.publishDate" class="flex items-center">
								<svg class="w-5 h-5 text-emerald-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
									/>
								</svg>
								<div>
									<div class="text-sm text-gray-500">完成日期</div>
									<div class="font-medium text-gray-900">{{ formatDate(currentCaseStudy.publishDate) }}</div>
								</div>
							</div>

							<div v-if="currentCaseStudy.solutions" class="flex items-center">
								<svg class="w-5 h-5 text-emerald-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
								</svg>
								<div>
									<div class="text-sm text-gray-500">解決方案數量</div>
									<div class="font-medium text-gray-900">{{ currentCaseStudy.solutions.length }} 項</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			<!-- 案例圖片展示 -->
			<section v-if="currentCaseStudy.images && currentCaseStudy.images.length > 0" class="py-16">
				<div class="container mx-auto px-4">
					<div class="max-w-6xl mx-auto">
						<h2 class="text-3xl font-bold text-center text-gray-900 mb-12">專案成果展示</h2>

						<!-- 主要圖片 -->
						<div v-if="currentCaseStudy.images.length === 1" class="mb-8">
							<img :src="currentCaseStudy.images[0]" :alt="currentCaseStudy.title" class="w-full h-auto rounded-lg shadow-lg" />
						</div>

						<!-- 多張圖片網格 -->
						<div v-else class="grid grid-cols-1 md:grid-cols-2 gap-8">
							<div v-for="(image, index) in currentCaseStudy.images" :key="index" class="aspect-video bg-gray-200 rounded-lg overflow-hidden shadow-lg">
								<img
									:src="image"
									:alt="`${currentCaseStudy.title} - 圖片 ${index + 1}`"
									class="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
								/>
							</div>
						</div>
					</div>
				</div>
			</section>

			<!-- 解決方案 -->
			<section v-if="currentCaseStudy.solutions && currentCaseStudy.solutions.length > 0" class="py-16 bg-white">
				<div class="container mx-auto px-4">
					<div class="max-w-4xl mx-auto">
						<h2 class="text-3xl font-bold text-center text-gray-900 mb-12">解決方案</h2>

						<div class="grid grid-cols-1 md:grid-cols-2 gap-8">
							<div v-for="(solution, index) in currentCaseStudy.solutions" :key="index" class="flex items-start p-6 bg-emerald-50 rounded-lg">
								<div class="flex-shrink-0 w-8 h-8 bg-emerald-500 text-white rounded-full flex items-center justify-center font-bold mr-4">
									{{ index + 1 }}
								</div>
								<div>
									<p class="text-gray-800 leading-relaxed">{{ solution }}</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			<!-- 專案成果 -->
			<section v-if="currentCaseStudy.results && currentCaseStudy.results.length > 0" class="py-16 bg-gray-50">
				<div class="container mx-auto px-4">
					<div class="max-w-4xl mx-auto">
						<h2 class="text-3xl font-bold text-center text-gray-900 mb-12">專案成果</h2>

						<div class="grid grid-cols-1 md:grid-cols-2 gap-8">
							<div v-for="(result, index) in currentCaseStudy.results" :key="index" class="flex items-start p-6 bg-white rounded-lg shadow-md">
								<div class="flex-shrink-0 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-bold mr-4">
									<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
									</svg>
								</div>
								<div>
									<p class="text-gray-800 leading-relaxed">{{ result }}</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			<!-- 聯絡我們 -->
			<section class="py-16 bg-emerald-500">
				<div class="container mx-auto px-4">
					<div class="max-w-4xl mx-auto text-center">
						<h2 class="text-3xl font-bold text-white mb-4">對這個案例有興趣嗎？</h2>
						<p class="text-xl text-emerald-100 mb-8">讓我們為您創造下一個成功案例</p>
						<NuxtLink
							to="/contact"
							class="inline-flex items-center px-8 py-3 bg-white text-emerald-500 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
						>
							立即聯絡我們
							<svg class="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
							</svg>
						</NuxtLink>
					</div>
				</div>
			</section>
		</div>
	</div>
</template>

<script setup>
import { computed, onMounted } from "vue";
import { useCaseStudyStore } from "~/stores/caseStudyStore";

// 獲取路由參數
const route = useRoute();
const slug = route.params.slug;

// 使用 caseStudy store
const caseStudyStore = useCaseStudyStore();

// 從 store 解構狀態和方法
const { currentCaseStudy, isLoading, error, fetchCaseStudyBySlug } = caseStudyStore;

// 設定頁面標題和 SEO
const pageTitle = computed(() => (currentCaseStudy.value ? `${currentCaseStudy.value.title} - 蝶蛹科技` : "案例研究 - 蝶蛹科技"));

const pageDescription = computed(() => (currentCaseStudy.value ? currentCaseStudy.value.description : "探索蝶蛹科技的成功案例"));

useHead({
	title: pageTitle,
	meta: [
		{
			name: "description",
			content: pageDescription
		},
		{
			property: "og:title",
			content: pageTitle
		},
		{
			property: "og:description",
			content: pageDescription
		}
	]
});

// 格式化日期
const formatDate = (dateString) => {
	const date = new Date(dateString);
	return date.toLocaleDateString("zh-TW", {
		year: "numeric",
		month: "long",
		day: "numeric"
	});
};

// 組件掛載時載入案例詳情
onMounted(async () => {
	try {
		await fetchCaseStudyBySlug(slug);
	} catch (error) {
		console.error("載入案例詳情失敗:", error);
	}
});
</script>
