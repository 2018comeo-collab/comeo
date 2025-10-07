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
				<div class="bg-white rounded-2xl p-2 shadow-lg border border-gray-200 inline-flex">
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

			<!-- 案例展示 -->
			<div class="grid grid-cols-1 md:grid-cols-3 gap-8">
				<div
					v-for="project in filteredProjects"
					:key="project.id"
					class="portfolio-card bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-200 group"
				>
					<!-- 案例圖片 -->
					<div class="aspect-video bg-gradient-to-br from-brand-orange/20 to-brand-red/20 relative overflow-hidden">
						<div class="absolute inset-0 flex items-center justify-center"></div>
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
						<p class="text-gray-600 mb-4 leading-relaxed">
							{{ project.description }}
						</p>

						<!-- 技術標籤 -->
						<div class="flex flex-nowrap justify-center gap-2 mb-4">
							<span
								v-for="tech in project.technologies"
								:key="tech"
								class="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium whitespace-nowrap"
							>
								{{ tech }}
							</span>
						</div>

						<!-- 查看詳情按鈕 -->
						<button
							@click="openProjectModal(project)"
							class="w-full bg-gradient-to-r from-brand-orange to-brand-red text-white font-semibold py-3 rounded-lg hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5"
						>
							查看詳情
						</button>
					</div>
				</div>
			</div>

			<!-- 更多案例按鈕 -->
			<div class="text-center mt-4 md:mt-8">
				<button
					class="bg-white text-brand-orange font-semibold px-8 py-4 rounded-2xl border-2 border-brand-orange hover:bg-brand-orange hover:text-white transition-all duration-300 shadow-lg"
				>
					查看更多案例
				</button>
			</div>
		</div>

		<!-- 專案詳情模態框 -->
		<div v-if="selectedProject" class="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50" @click="closeProjectModal">
			<div class="bg-white rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto" @click.stop>
				<div class="p-6">
					<div class="flex justify-between items-start mb-4">
						<h3 class="text-2xl font-bold text-gray-900">{{ selectedProject.title }}</h3>
						<button @click="closeProjectModal" class="text-gray-500 hover:text-gray-700 transition-colors">
							<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
							</svg>
						</button>
					</div>

					<div class="space-y-4">
						<div>
							<h4 class="font-semibold text-gray-900 mb-2">專案概述</h4>
							<p class="text-gray-600">{{ selectedProject.fullDescription }}</p>
						</div>

						<div>
							<h4 class="font-semibold text-gray-900 mb-2">解決方案</h4>
							<ul class="list-disc list-inside text-gray-600 space-y-1">
								<li v-for="solution in selectedProject.solutions" :key="solution">{{ solution }}</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from "vue";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const container = ref<HTMLElement | null>(null);
let ctx: gsap.Context;

interface Project {
	id: string;
	title: string;
	category: string;
	description: string;
	fullDescription: string;
	technologies: string[];
	solutions: string[];
}

interface Category {
	id: string;
	name: string;
}

const activeCategory = ref("all");
const selectedProject = ref<Project | null>(null);

const categories: Category[] = [
	{ id: "all", name: "全部案例" },
	{ id: "building", name: "建築智慧化" },
	{ id: "security", name: "安全監控" },
	{ id: "retail", name: "零售服務" }
];

const projects: Project[] = [
	{
		id: "1",
		title: "辦公大樓智慧化升級",
		category: "建築智慧化",
		description: "為台北市某商辦大樓進行全面智慧化改造，包含門禁、對講、監控等系統整合。",
		fullDescription: "此專案為台北市信義區某A級商辦大樓的智慧化升級專案，涵蓋門禁管制、訪客管理、可視對講、停車管理等多項系統的整合。",
		technologies: ["智慧門禁", "可視對講", "停車管理", "系統整合"],
		solutions: ["多樓層門禁管制系統", "訪客預約與管理平台", "智慧停車場管理", "可視對講系統整合"]
	},
	{
		id: "2",
		title: "物流中心安全監控",
		category: "安全監控",
		description: "為大型物流中心建置24小時智慧監控系統，確保貨物與人員安全。",
		fullDescription: "此專案為北部某大型物流中心的安全監控專案，涵蓋倉儲區、裝卸區、辦公區等區域的全面監控，並整合AI分析功能。",
		technologies: ["智慧監控", "AI分析", "周界防護", "中央管理"],
		solutions: ["全區域高清監控系統", "AI行為分析與預警", "周界入侵偵測系統", "中央監控室整合管理"]
	},
	{
		id: "3",
		title: "連鎖零售店安防整合",
		category: "零售服務",
		description: "為全台連鎖零售品牌建置統一的安防監控平台，實現多店面集中管理。",
		fullDescription: "此專案涵蓋全台超過50個店面的安防系統整合，建置統一的監控平台，讓總部能夠即時掌握各店面的安全狀況。",
		technologies: ["中央監控", "雲端整合", "行動監控", "數據分析"],
		solutions: ["多店面監控系統整合", "雲端集中管理平台", "行動裝置即時監控", "異常事件自動通報"]
	}
];

const filteredProjects = computed(() => {
	if (activeCategory.value === "all") {
		return projects;
	}
	return projects.filter((project) => project.category === activeCategory.value);
});

const openProjectModal = (project: Project) => {
	selectedProject.value = project;
};

const closeProjectModal = () => {
	selectedProject.value = null;
};

onMounted(() => {
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

		portfolioTimeline.to(".grid.grid-cols-1", { opacity: 1, y: 0, duration: 1 });
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

.portfolio-card {
	transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.portfolio-card:hover {
	transform: translateY(-0.5rem);
	box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

/* 防止首次渲染閃爍 - 統一初始狀態 */
header,
.flex.justify-center,
.grid.grid-cols-1 {
	opacity: 0;
	transform: translateY(50px);
}

/* 響應式調整 */
@media (max-width: 768px) {
	.portfolio-card {
		margin-bottom: 1rem;
	}
}
</style>
