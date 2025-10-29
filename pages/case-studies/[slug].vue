<template>
	<div class="min-h-screen bg-gray-50">
		<!-- 載入狀態 -->
		<div v-if="isLoading" class="flex justify-center items-center min-h-screen">
			<div class="text-center">
				<div class="relative w-16 h-16 mx-auto mb-4">
					<div class="absolute inset-0 border-4 border-brand-orange/20 rounded-full"></div>
					<div class="absolute inset-0 border-4 border-brand-orange border-t-transparent rounded-full animate-spin"></div>
				</div>
				<p class="text-gray-600 font-medium">載入中...</p>
			</div>
		</div>

		<!-- 錯誤狀態 -->
		<div v-else-if="error" class="flex flex-col items-center justify-center min-h-screen">
			<div class="max-w-md mx-auto text-center">
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
				<p class="text-red-500 mb-4">{{ error }}</p>
				<NuxtLink to="/case-studies" class="px-6 py-2 bg-brand-orange text-white rounded-lg hover:bg-orange-600 transition-colors inline-block">
					返回案例列表
				</NuxtLink>
			</div>
		</div>

		<!-- 案例詳情內容 -->
		<div v-else-if="currentCaseStudy" class="bg-white">
			<!-- 案例標題區域 -->
			<section class="bg-gradient-to-r from-orange-50 to-red-50 pt-20 sm:pt-24 md:pt-28 pb-12 sm:pb-16">
				<div class="container mx-auto px-4 sm:px-6 lg:px-8">
					<div class="max-w-4xl mx-auto">
						<!-- 返回按鈕 -->
						<NuxtLink
							to="/case-studies"
							class="inline-flex items-center px-3 sm:px-4 py-3 sm:py-4 bg-white/80 backdrop-blur-sm text-brand-orange hover:bg-white hover:text-orange-700 rounded-lg shadow-sm hover:shadow-md mb-6 sm:mb-8 transition-all duration-300 group"
						>
							<svg
								class="w-4 h-4 sm:w-5 sm:h-5 mr-2 group-hover:-translate-x-1 transition-transform duration-300"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
							</svg>
							<span class="font-medium text-sm sm:text-base">返回案例列表</span>
						</NuxtLink>

						<!-- 案例標題 -->
						<h1 class="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight">
							{{ currentCaseStudy.title }}
						</h1>

						<!-- 案例描述 -->
						<p class="text-base sm:text-lg md:text-xl text-gray-600 leading-relaxed">
							{{ currentCaseStudy.description }}
						</p>

						<!-- 案例資訊 -->
						<div
							v-if="currentCaseStudy.author || (currentCaseStudy.solutions && currentCaseStudy.solutions.length > 0)"
							class="mt-6 sm:mt-8 lg:mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6"
						>
							<!-- 專案負責人 -->
							<div
								v-if="currentCaseStudy.author"
								class="flex items-center p-4 sm:p-6 bg-white/80 backdrop-blur-sm rounded-xl shadow-md hover:shadow-lg transition-shadow"
							>
								<div
									class="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-orange-100 to-red-100 rounded-full flex items-center justify-center mr-3 sm:mr-4"
								>
									<svg class="w-6 h-6 sm:w-7 sm:h-7 text-brand-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2"
											d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
										/>
									</svg>
								</div>
								<div>
									<div class="text-xs sm:text-sm text-gray-500 font-medium mb-1">專案負責人</div>
									<div class="text-base sm:text-lg font-bold text-gray-900">{{ currentCaseStudy.author }}</div>
								</div>
							</div>

							<!-- 解決方案數量 -->
							<div
								v-if="currentCaseStudy.solutions && currentCaseStudy.solutions.length > 0"
								class="flex items-center p-4 sm:p-6 bg-white/80 backdrop-blur-sm rounded-xl shadow-md hover:shadow-lg transition-shadow"
							>
								<div
									class="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-orange-100 to-red-100 rounded-full flex items-center justify-center mr-3 sm:mr-4"
								>
									<svg class="w-6 h-6 sm:w-7 sm:h-7 text-brand-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
									</svg>
								</div>
								<div>
									<div class="text-xs sm:text-sm text-gray-500 font-medium mb-1">解決方案數量</div>
									<div class="text-base sm:text-lg font-bold text-gray-900">{{ currentCaseStudy.solutions.length }} 項</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			<!-- 專案挑戰/背景 -->
			<section v-if="currentCaseStudy.challenge || currentCaseStudy.background" class="py-12 sm:py-16 bg-white">
				<div class="container mx-auto px-4 sm:px-6 lg:px-8">
					<div class="max-w-4xl mx-auto">
						<h2 class="text-2xl sm:text-3xl font-bold text-center text-gray-900 mb-8 sm:mb-12">專案背景與挑戰</h2>
						<div class="prose prose-lg max-w-none">
							<p v-if="currentCaseStudy.challenge" class="text-sm sm:text-base text-gray-700 leading-relaxed mb-4">
								{{ currentCaseStudy.challenge }}
							</p>
							<p v-if="currentCaseStudy.background" class="text-sm sm:text-base text-gray-700 leading-relaxed">
								{{ currentCaseStudy.background }}
							</p>
						</div>
					</div>
				</div>
			</section>

			<!-- 使用的技術 -->
			<section v-if="currentCaseStudy.technologies && currentCaseStudy.technologies.length > 0" class="py-12 sm:py-16 bg-gray-50">
				<div class="container mx-auto px-4 sm:px-6 lg:px-8">
					<div class="max-w-4xl mx-auto">
						<h2 class="text-2xl sm:text-3xl font-bold text-center text-gray-900 mb-8 sm:mb-12">使用技術</h2>
						<div class="flex flex-wrap gap-2 sm:gap-3 justify-center">
							<span
								v-for="(tech, index) in currentCaseStudy.technologies"
								:key="index"
								class="px-3 sm:px-4 py-2 bg-white text-brand-orange font-medium rounded-full border-2 border-brand-orange hover:bg-brand-orange hover:text-white transition-colors text-sm sm:text-base"
							>
								{{ tech }}
							</span>
						</div>
					</div>
				</div>
			</section>

			<!-- 案例圖片展示 -->
			<section v-if="currentCaseStudy.images && currentCaseStudy.images.length > 0" class="py-12 sm:py-16">
				<div class="container mx-auto px-4 sm:px-6 lg:px-8">
					<div class="max-w-6xl mx-auto">
						<h2 class="text-2xl sm:text-3xl font-bold text-center text-gray-900 mb-8 sm:mb-12">專案成果展示</h2>

						<!-- 主要圖片 -->
						<div v-if="currentCaseStudy.images.length === 1" class="mb-6 sm:mb-8">
							<div class="aspect-video bg-gray-200 rounded-lg overflow-hidden shadow-lg max-w-4xl mx-auto">
								<img
									:src="getImageUrl(currentCaseStudy.images[0])"
									:alt="currentCaseStudy.title"
									class="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
								/>
							</div>
						</div>

						<!-- 多張圖片網格 -->
						<div v-else class="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
							<div v-for="(image, index) in currentCaseStudy.images" :key="index" class="aspect-video bg-gray-200 rounded-lg overflow-hidden shadow-lg">
								<img
									:src="getImageUrl(image)"
									:alt="`${currentCaseStudy.title} - 圖片 ${index + 1}`"
									class="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
								/>
							</div>
						</div>
					</div>
				</div>
			</section>

			<!-- 解決方案 -->
			<section v-if="currentCaseStudy.solutions && currentCaseStudy.solutions.length > 0" class="py-12 sm:py-16 bg-white">
				<div class="container mx-auto px-4 sm:px-6 lg:px-8">
					<div class="max-w-4xl mx-auto">
						<h2 class="text-2xl sm:text-3xl font-bold text-center text-gray-900 mb-8 sm:mb-12">解決方案</h2>

						<div class="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
							<div
								v-for="(solution, index) in currentCaseStudy.solutions"
								:key="index"
								class="flex items-start p-4 sm:p-6 bg-gradient-to-br from-orange-50 to-red-50 rounded-lg"
							>
								<div
									class="flex-shrink-0 w-6 h-6 sm:w-8 sm:h-8 bg-brand-orange text-white rounded-full flex items-center justify-center font-bold mr-3 sm:mr-4 text-sm sm:text-base"
								>
									{{ index + 1 }}
								</div>
								<div>
									<p class="text-sm sm:text-base text-gray-800 leading-relaxed">{{ solution }}</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			<!-- 專案成果 -->
			<section v-if="currentCaseStudy.results && currentCaseStudy.results.length > 0" class="py-12 sm:py-16 bg-gray-50">
				<div class="container mx-auto px-4 sm:px-6 lg:px-8">
					<div class="max-w-4xl mx-auto">
						<h2 class="text-2xl sm:text-3xl font-bold text-center text-gray-900 mb-8 sm:mb-12">專案成果</h2>

						<div class="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
							<div v-for="(result, index) in currentCaseStudy.results" :key="index" class="flex items-start p-4 sm:p-6 bg-white rounded-lg shadow-md">
								<div class="flex-shrink-0 w-6 h-6 sm:w-8 sm:h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-bold mr-3 sm:mr-4">
									<svg class="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
									</svg>
								</div>
								<div>
									<p class="text-sm sm:text-base text-gray-800 leading-relaxed">{{ result }}</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useCaseStudyStore } from "~/stores/caseStudyStore";
import { storeToRefs } from "pinia";

// 使用 default 佈局並隱藏中間導航連結
definePageMeta({
	layout: "default",
	hideNavLinks: true
});

// 獲取路由參數
const route = useRoute();
const slug = route.params.slug as string;

// 使用 caseStudy store
const caseStudyStore = useCaseStudyStore();
const { currentCaseStudy, isLoading, error } = storeToRefs(caseStudyStore);
const { fetchCaseStudyBySlug } = caseStudyStore;

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
const formatDate = (dateString: string) => {
	const date = new Date(dateString);
	return date.toLocaleDateString("zh-TW", {
		year: "numeric",
		month: "long",
		day: "numeric"
	});
};

// 圖片處理函數
const getImageUrl = (imageUrl: string) => {
	if (!imageUrl) return "";
	if (imageUrl.startsWith("http")) return imageUrl;
	return `${useRuntimeConfig().public.apiBaseUrl}${imageUrl}`;
};

// 組件掛載時載入案例詳情
onMounted(async () => {
	try {
		if (slug) {
			await fetchCaseStudyBySlug(slug);
		} else {
			error.value = "案例 ID 不存在";
		}
	} catch (err) {
		console.error("載入案例詳情失敗:", err);
	}
});
</script>

<style scoped>
/* 響應式調整 */
@media (max-width: 640px) {
	/* 小螢幕時調整間距 */
	.container {
		padding-left: 1rem;
		padding-right: 1rem;
	}

	/* 小螢幕時調整文字大小 */
	.prose {
		font-size: 0.875rem;
		line-height: 1.5;
	}
}

/* 確保圖片在小螢幕上正確顯示 */
.aspect-video {
	position: relative;
	width: 100%;
	height: 0;
	padding-bottom: 56.25%; /* 16:9 比例 */
}

.aspect-video img {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	object-fit: cover;
}
</style>
