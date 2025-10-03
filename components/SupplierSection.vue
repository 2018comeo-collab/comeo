<template>
	<section id="partners" ref="container" class="min-h-screen py-24">
		<div class="container mx-auto px-4 lg:px-8">
			<!-- 標題區域 -->
			<header class="text-center mb-8">
				<h2 class="text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 mb-6">合作夥伴</h2>
				<p class="text-xl md:text-2xl lg:text-3xl gradient-text font-bold mx-auto leading-relaxed">攜手遠岫科技，提供全方位的智慧安全解決方案</p>
			</header>

			<!-- 遠岫科技介紹 -->
			<div class="bg-white rounded-2xl p-4 lg:p-8 shadow-lg border border-gray-200 mb-8 flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-8">
				<NuxtImg
					src="/yenshow.png"
					alt="遠岫科技 Logo - 專注於人臉辨識門禁、智慧對講、影像監控與整合平台的科技公司"
					class="w-48 h-auto object-contain mx-auto"
					loading="eager"
					width="400"
					height="200"
					format="webp"
					quality="90"
					preload
				/>
				<div class="flex-1">
					<h3 class="text-2xl font-bold text-gray-900 mb-4">遠岫科技有限公司</h3>
					<p class="text-gray-700 leading-relaxed">
						專注於人臉辨識門禁、智慧對講、影像監控與整合平台的開發與導入， 致力於成為企業與建築場域「出入口安全」與「智慧整合」的最佳夥伴。<br />
						提供 12 大智慧方案，涵蓋多個領域，提升生活與工作空間的便捷、安全與高效。
					</p>
					<a
						href="https://www.yenshow.com/"
						target="_blank"
						class="inline-flex items-center gap-2 mt-4 text-brand-orange hover:text-brand-red transition-colors font-semibold"
					>
						<span>了解更多</span>
						<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
							/>
						</svg>
					</a>
				</div>
			</div>

			<!-- 12 大智慧方案 - 2x2 外層布局 -->
			<div class="space-y-12 mb-8">
				<!-- 外層 2x2 網格 -->
				<div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
					<!-- 使用 v-for 渲染分類 -->
					<div v-for="category in solutionCategories" :key="category.id" class="solution-category">
						<div class="category-header">
							<div class="category-icon">
								<svg class="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
									<path fill-rule="evenodd" :d="category.icon" clip-rule="evenodd" />
								</svg>
							</div>
							<div>
								<h3 class="text-xl font-bold text-gray-900">{{ category.title }}</h3>
								<p class="text-gray-600">{{ category.description }}</p>
							</div>
						</div>
						<div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
							<!-- 使用 v-for 渲染方案 -->
							<div
								v-for="solution in category.solutions"
								:key="solution.id"
								class="solution-card"
								@click="setActiveSeries(solution.id)"
								:class="{ active: activeSeries === solution.id }"
							>
								<div class="card-content">
									<h4 class="font-bold text-gray-900">{{ solution.title }}</h4>
									<p class="text-sm text-gray-600">{{ solution.description }}</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const container = ref<HTMLElement | null>(null);
const activeSeries = ref<string | null>(null);
let ctx: gsap.Context;

const setActiveSeries = (series: string) => {
	activeSeries.value = activeSeries.value === series ? null : series;
};

onMounted(() => {
	if (!container.value) return;

	ctx = gsap.context(() => {
		// 共用的 ScrollTrigger 配置

		// Part 1: 標題區域動畫
		const headerTimeline = gsap.timeline({
			scrollTrigger: { trigger: "header", start: "top 80%" }
		});

		headerTimeline.to("header", { opacity: 1, y: 0, duration: 1 });

		// Part 2: 遠岫科技介紹動畫
		const introTimeline = gsap.timeline({
			scrollTrigger: { trigger: ".bg-white", start: "top 70%" }
		});

		introTimeline.to(".bg-white", { opacity: 1, y: 0, duration: 1 });

		// Part 3: 方案分類動畫
		const categoriesTimeline = gsap.timeline({
			scrollTrigger: { trigger: ".solution-category", start: "top 70%" }
		});

		categoriesTimeline.to(".solution-category", { opacity: 1, y: 0, duration: 1, stagger: 0.2 });
	}, container.value);
});

onUnmounted(() => {
	if (ctx) {
		ctx.revert(); // cleanup
	}
});

// 12 大智慧方案資料
const solutionCategories = [
	{
		id: "building",
		title: "建築智慧化方案",
		description: "打造智慧建築生態系統",
		icon: "M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-6a1 1 0 00-1-1H9a1 1 0 00-1 1v6a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z",
		solutions: [
			{
				id: "property",
				title: "物業管理系統",
				description: "全方位物業管理解決方案",
				icon: "M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-6a1 1 0 00-1-1H9a1 1 0 00-1 1v6a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z"
			},
			{
				id: "intercom",
				title: "可視對講系統",
				description: "高品質可視對講設備",
				icon: "M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"
			},
			{
				id: "face-access",
				title: "人臉門禁控制",
				description: "AI 人臉辨識技術",
				icon: "M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
			}
		]
	},
	{
		id: "security",
		title: "安全監控方案",
		description: "全方位安全防護系統",
		icon: "M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z",
		solutions: [
			{
				id: "central-monitor",
				title: "中央監控系統",
				description: "整合多種監控設備",
				icon: "M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
			},
			{
				id: "fire-alarm",
				title: "火災預警系統",
				description: "先進火災預警技術",
				icon: "M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
			},
			{
				id: "wireless-security",
				title: "無線保全系統",
				description: "無線技術保全方案",
				icon: "M18 8a6 6 0 01-7.743 5.743L10 14l-1 1-1 1H6v2H2v-4l4.257-4.257A6 6 0 1118 8zm-6-4a1 1 0 100 2 2 2 0 012 2 1 1 0 102 0 4 4 0 00-4-4z"
			}
		]
	},
	{
		id: "management",
		title: "智慧管理方案",
		description: "智能化營運管理解決方案",
		icon: "M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z",
		solutions: [
			{
				id: "meeting",
				title: "會議預約系統",
				description: "智能化會議室管理",
				icon: "M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
			},
			{
				id: "visitor",
				title: "訪客管理系統",
				description: "有效訪客登記管理",
				icon: "M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z"
			},
			{
				id: "parking",
				title: "停車管理系統",
				description: "智能化停車場管理",
				icon: "M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
			}
		]
	},
	{
		id: "professional",
		title: "專業應用方案",
		description: "專業領域智慧解決方案",
		icon: "M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z",
		solutions: [
			{
				id: "construction",
				title: "智慧工地管理",
				description: "工地安全智能管理",
				icon: "M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z"
			},
			{
				id: "elderly-care",
				title: "長照關懷輔助",
				description: "長者照護智能方案",
				icon: "M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
			},
			{
				id: "smart-factory",
				title: "AI智慧工廠",
				description: "強化安全與工作流程",
				icon: "M19.428 15.502a1 1 0 00-1.04-.98H5.04a1 1 0 00-1.04.98l-1.5 6.5a1 1 0 001.04 1.02h13.5a1 1 0 001.04-1.02l-1.5-6.5zM9 12a1 1 0 11-2 0 1 1 0 012 0zm4 0a1 1 0 11-2 0 1 1 0 012 0z"
			}
		]
	}
];
</script>

<style scoped>
.gradient-text {
	background: linear-gradient(90deg, theme("colors.brand.yellow"), theme("colors.brand.orange"), theme("colors.brand.red"));
	-webkit-background-clip: text;
	background-clip: text;
	color: transparent;
}

.solution-category {
	background: white;
	border-radius: 1.5rem;
	padding: 2rem;
	box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
	border: 1px solid #e5e7eb;
}

.category-header {
	display: flex;
	align-items: center;
	gap: 1rem;
	margin-bottom: 1.5rem;
	padding-bottom: 1rem;
	border-bottom: 2px solid #f3f4f6;
}

.category-icon {
	width: 3rem;
	height: 3rem;
	background: linear-gradient(to bottom right, #f97316, #ef4444);
	border-radius: 0.75rem;
	display: flex;
	align-items: center;
	justify-content: center;
	color: white;
}

.solution-card {
	background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
	border-radius: 1rem;
	padding: 1.5rem;
	box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
	border: 1px solid #e5e7eb;
	transition: all 0.3s ease;
	cursor: pointer;
	display: flex;
	align-items: center;
	justify-content: center;
	text-align: center;
}

.solution-card:hover {
	box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
	transform: translateY(-0.25rem);
	border-color: #f97316;
}

.solution-card.active {
	box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
	transform: translateY(-0.25rem);
	border-color: #f97316;
	background: linear-gradient(135deg, #fff7ed 0%, #fed7aa 100%);
}

.card-content {
	flex: 1;
}

/* 防止首次渲染閃爍 - 統一初始狀態 */
header,
.bg-white,
.solution-category {
	opacity: 0;
	transform: translateY(50px);
}

/* 響應式調整 */
@media (max-width: 768px) {
	.solution-category {
		padding: 1.5rem;
	}

	.solution-card {
		padding: 1rem;
	}

	.category-icon {
		width: 2.5rem;
		height: 2.5rem;
	}
}
</style>
