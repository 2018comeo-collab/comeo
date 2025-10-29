<template>
	<section id="portfolio" ref="container" class="min-h-screen py-24">
		<div class="container mx-auto px-4 lg:px-8">
			<!-- 標題區域 -->
			<header class="text-center mb-8">
				<h2 class="text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 mb-2 md:mb-4">實績案例</h2>
				<p class="text-xl md:text-2xl lg:text-3xl gradient-text font-bold mx-auto leading-relaxed">成功案例見證我們的專業實力</p>
			</header>

			<!-- 案例分類選單 -->
			<div class="flex justify-center mb-12">
				<div class="bg-white rounded-2xl p-2 shadow-lg border border-gray-200 inline-flex gap-2">
					<button
						v-for="category in categories"
						:key="category.id"
						@click="activeCategory = category.id"
						:class="[
							'px-6 py-3 rounded-xl font-semibold transition-all duration-300',
							activeCategory === category.id ? 'bg-brand-orange text-white shadow-md' : 'text-gray-600 hover:text-brand-orange hover:bg-orange-50'
						]"
					>
						{{ category.name }}
					</button>
				</div>
			</div>

			<!-- 載入狀態 -->
			<div v-if="isLoading" class="flex justify-center items-center py-12">
				<div class="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-orange"></div>
			</div>

			<!-- 錯誤狀態 -->
			<div v-else-if="error" class="text-center py-12">
				<div class="text-red-500 mb-4">{{ error }}</div>
				<button
					@click="() => fetchAllCaseStudies({ isActive: true })"
					class="px-6 py-2 bg-brand-orange text-white rounded-lg hover:bg-orange-600 transition-colors"
				>
					重新載入
				</button>
			</div>

			<!-- 案例展示 -->
			<div v-else-if="filteredProjects.length > 0" class="grid grid-cols-1 md:grid-cols-3 gap-8" :class="{ 'initial-load': !hasAnimated }">
				<div
					v-for="project in filteredProjects"
					:key="project.id"
					class="portfolio-card bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-200 group"
				>
					<!-- 案例圖片 -->
					<div class="aspect-video bg-gradient-to-br from-brand-orange/20 to-brand-red/20 relative overflow-hidden">
						<!-- 如果有圖片，顯示圖片 -->
						<img
							v-if="project.coverImageUrl || (project.images && project.images.length > 0)"
							:src="project.coverImageUrl || project.images[0]"
							:alt="project.title"
							class="w-full h-full object-cover transition-opacity duration-300"
							@error="handleImageError"
							@load="handleImageLoad"
						/>
						<!-- 預設內容 - 當沒有圖片或圖片載入失敗時顯示 -->
						<div
							class="image-fallback absolute inset-0 flex items-center justify-center"
							:style="{ display: !project.coverImageUrl && (!project.images || project.images.length === 0) ? 'flex' : 'none' }"
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
								{{ project.category }}
							</span>
						</div>
					</div>

					<!-- 案例內容 -->
					<div class="p-6">
						<h3 class="text-xl font-bold text-gray-900 mb-3 group-hover:text-brand-orange transition-colors">
							{{ project.title }}
						</h3>
						<p class="text-gray-600 mb-4 leading-relaxed line-clamp-4">
							{{ project.description }}
						</p>

						<!-- 解決方案標籤 -->
						<div v-if="project.technologies && project.technologies.length > 0" class="mb-4">
							<h4 class="text-sm font-semibold text-gray-700 mb-2">解決方案</h4>
							<div class="flex flex-nowrap gap-2 overflow-hidden">
								<span
									v-for="(tech, index) in getVisibleTechnologies(project.technologies)"
									:key="index"
									class="bg-gradient-to-r from-brand-orange/10 to-brand-red/10 text-brand-orange px-3 py-1.5 rounded-full text-sm font-medium border border-brand-orange/20 hover:from-brand-orange/20 hover:to-brand-red/20 transition-all duration-200 whitespace-nowrap"
								>
									{{ tech }}
								</span>
							</div>
						</div>

						<!-- 查看詳情按鈕 -->
						<NuxtLink
							:to="`/case-studies/${project.slug || project.id}`"
							class="w-full inline-block bg-gradient-to-r from-brand-orange to-brand-red text-white font-semibold py-3 rounded-lg hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 text-center"
						>
							查看詳情
						</NuxtLink>
					</div>
				</div>
			</div>

			<!-- 空狀態 -->
			<div v-else class="text-center py-12">
				<div class="text-gray-500 mb-4">目前沒有找到案例研究</div>
				<button
					@click="() => fetchAllCaseStudies({ isActive: true })"
					class="px-6 py-2 bg-brand-orange text-white rounded-lg hover:bg-orange-600 transition-colors"
				>
					重新載入
				</button>
			</div>

			<!-- 更多案例按鈕 -->
			<div v-if="filteredProjects.length > 0" class="text-center mt-4 md:mt-8 more-cases-button">
				<NuxtLink
					to="/case-studies"
					class="inline-block bg-white text-brand-orange font-semibold px-8 py-4 rounded-2xl border-2 border-brand-orange hover:bg-brand-orange hover:text-white transition-all duration-300 shadow-lg"
				>
					查看更多案例
				</NuxtLink>
			</div>
		</div>
	</section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch, nextTick } from "vue";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useCaseStudyStore } from "~/stores/caseStudyStore";
import { storeToRefs } from "pinia";

gsap.registerPlugin(ScrollTrigger);

const container = ref<HTMLElement | null>(null);
let ctx: gsap.Context;

// 使用 caseStudyStore
const caseStudyStore = useCaseStudyStore();
const { caseStudyList, isLoading, error } = storeToRefs(caseStudyStore);
const { fetchAllCaseStudies } = caseStudyStore;

interface Project {
	id: string;
	title: string;
	category: string;
	description: string;
	fullDescription: string;
	technologies: string[];
	solutions: string[];
	images?: string[];
	coverImageUrl?: string;
}

interface Category {
	id: string;
	name: string;
}

const activeCategory = ref("all");
const hasAnimated = ref(false);

// 所有可能的分類選項
const allCategories: Category[] = [
	{ id: "智慧建築", name: "智慧建築" },
	{ id: "系統整合", name: "系統整合" },
	{ id: "安全監控", name: "安全監控" }
];

// 動態生成分類選項 - 只顯示有資料的類別
const categories = computed(() => {
	// 獲取所有專案的類別，過濾掉 undefined
	const availableCategories = new Set(projects.value.map((p) => p.category).filter((cat): cat is string => !!cat));

	// 篩選出有資料的類別
	const activeCategories = allCategories.filter((cat) => availableCategories.has(cat.id));

	// 始終在最前面加上「全部案例」
	return [{ id: "all", name: "全部案例" }, ...activeCategories];
});

// 將後端資料轉換為前端格式，並過濾掉未啟用的案例
const projects = computed(() => {
	return caseStudyList.value
		.filter((caseStudy: any) => caseStudy.isActive !== false) // 過濾掉未啟用的案例
		.map((caseStudy: any) => {
			const processedProject = {
				id: caseStudy._id,
				title: caseStudy.title,
				category: caseStudy.projectType,
				description: caseStudy.description,
				fullDescription: caseStudy.description, // 使用相同描述作為完整描述
				technologies: caseStudy.solutions || [], // 使用 solutions 作為技術標籤
				solutions: caseStudy.solutions || [],
				images: caseStudy.images || [],
				slug: caseStudy.slug || caseStudy._id, // 添加 slug 欄位
				coverImageUrl: caseStudy.coverImageUrl
					? caseStudy.coverImageUrl.startsWith("http")
						? caseStudy.coverImageUrl
						: `${useRuntimeConfig().public.apiBaseUrl}${caseStudy.coverImageUrl}`
					: null
			};
			return processedProject;
		});
});

const filteredProjects = computed(() => {
	let filtered = [];
	if (activeCategory.value === "all") {
		filtered = projects.value;
	} else {
		filtered = projects.value.filter((project) => project.category === activeCategory.value);
	}
	// 限制只顯示前3個案例
	return filtered.slice(0, 3);
});

// 調試用：監聽篩選變化
watch(activeCategory, (newCategory) => {
	// 檢查資料對應問題
	if (newCategory !== "all") {
		const matchingProjects = projects.value.filter((p) => p.category === newCategory);
		console.log(`尋找類別 "${newCategory}" 的專案:`, matchingProjects.length);
	}

	// 當篩選變化時，確保案例可見
	nextTick(() => {
		if (container.value) {
			const gridElement = container.value.querySelector(".grid.grid-cols-1");
			if (gridElement) {
				// 直接設定為可見狀態，避免動畫影響
				gsap.set(gridElement, { opacity: 1, y: 0 });
				hasAnimated.value = true;
			}
		}
	});
});

// 處理圖片載入錯誤
const handleImageError = (event: Event) => {
	const img = event.target as HTMLImageElement;
	// 隱藏載入失敗的圖片，顯示預設內容
	img.style.display = "none";
	// 找到父容器並顯示預設內容
	const container = img.closest(".aspect-video") as HTMLElement;
	if (container) {
		const fallback = container.querySelector(".image-fallback") as HTMLElement;
		if (fallback) {
			fallback.style.display = "flex";
		}
	}
};

// 處理圖片載入成功
const handleImageLoad = (event: Event) => {
	const img = event.target as HTMLImageElement;
	img.style.opacity = "1";
};

const getVisibleTechnologies = (technologies: string[] = []): string[] => {
	if (!technologies) return [];

	const MAX_TAGS = 4;
	const MAX_TOTAL_LENGTH = 22; // Heuristic value for total characters

	const visible: string[] = [];
	let currentLength = 0;

	for (const tech of technologies) {
		if (visible.length >= MAX_TAGS) {
			break;
		}

		if (currentLength + tech.length > MAX_TOTAL_LENGTH && visible.length > 0) {
			// If adding this tag would exceed the length, and we already have at least one tag, stop.
			break;
		}

		visible.push(tech);
		currentLength += tech.length;
	}

	// Ensure at least one tag is shown if the array is not empty, even if it exceeds the length limit.
	if (visible.length === 0 && technologies.length > 0) {
		const firstTech = technologies[0];
		return firstTech ? [firstTech] : [];
	}

	return visible;
};

onMounted(async () => {
	// 載入案例研究資料，確保只獲取啟用的案例
	await fetchAllCaseStudies({ isActive: true });

	if (!container.value) return;

	ctx = gsap.context(() => {
		// Part 1: 標題區域動畫
		const headerTimeline = gsap.timeline({
			scrollTrigger: { trigger: "header", start: "top 80%" }
		});

		headerTimeline.to("header", { opacity: 1, y: 0, duration: 1 });

		// Part 2: 分類選單動畫
		const menuTimeline = gsap.timeline({
			scrollTrigger: { trigger: ".flex.justify-center", start: "top 70%" }
		});

		menuTimeline.to(".flex.justify-center", { opacity: 1, y: 0, duration: 1 });

		// Part 3: 案例展示區域動畫
		const portfolioTimeline = gsap.timeline({
			scrollTrigger: { trigger: ".grid.grid-cols-1", start: "top 70%" }
		});

		portfolioTimeline.to(".grid.grid-cols-1", {
			opacity: 1,
			y: 0,
			duration: 1,
			onComplete: () => {
				hasAnimated.value = true;
			}
		});

		// Part 4: 更多案例按鈕動畫
		const moreButtonTimeline = gsap.timeline({
			scrollTrigger: { trigger: ".more-cases-button", start: "top 80%" }
		});

		moreButtonTimeline.to(".more-cases-button", {
			opacity: 1,
			y: 0,
			duration: 1
		});
	}, container.value);
});

onUnmounted(() => {
	if (ctx) {
		ctx.revert(); // cleanup
	}
});
</script>

<style scoped>
.gradient-text {
	background: linear-gradient(90deg, theme("colors.brand.yellow"), theme("colors.brand.orange"), theme("colors.brand.red"));
	-webkit-background-clip: text;
	background-clip: text;
	color: transparent;
}

/* 防止首次渲染閃爍 - 統一初始狀態 */
header,
.flex.justify-center,
.more-cases-button {
	opacity: 0;
	transform: translateY(50px);
}

/* 案例網格初始狀態 - 只在首次載入時隱藏 */
.grid.grid-cols-1.initial-load {
	opacity: 0;
	transform: translateY(50px);
}

/* 響應式調整 */
@media (max-width: 768px) {
	.portfolio-card {
		margin-bottom: 1rem;
	}
}

/* 文字截斷樣式 */
.line-clamp-1 {
	display: -webkit-box;
	-webkit-line-clamp: 1;
	line-clamp: 1;
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
</style>
