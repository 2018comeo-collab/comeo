<template>
	<section id="about" ref="container" class="lg:grid lg:grid-cols-12 container mx-auto px-4 lg:px-8 gap-8">
		<div ref="leftPanel" class="py-24 lg:col-span-7">
			<!-- Part 1: Hero -->
			<div class="space-y-4 min-h-[40vh] lg:min-h-[80vh] flex flex-col justify-center hero-content">
				<h1 class="hero-title text-black text-4xl md:text-5xl lg:text-6xl font-black tracking-[0.2em]">
					<span class="inline-block hero-title-line1">從蝶繭到展翼</span>
					<NuxtImg src="/comeo-logo.png" alt="Comeo Logo" class="inline-block w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 hero-logo" />
					<span class="gradient-text inline-block hero-title-line2">為您打造智慧新境界</span>
				</h1>
				<p class="hero-subtitle text-lg md:text-xl lg:text-2xl tracking-[0.15em] text-gray-400">以專業技術引領轉變，陪伴企業完成數位蛻變。</p>
			</div>

			<!-- Part 2: Services -->
			<div class="space-y-8 min-h-[80vh] flex flex-col justify-center">
				<header class="text-center services-header">
					<h2 class="text-3xl md:text-4xl lg:text-5xl font-extrabold">核心服務</h2>
					<p class="text-lg md:text-xl lg:text-2xl tracking-wide text-gray-400 mt-4">專為建商與中端企業量身打造的系統整合與數位化方案</p>
				</header>

				<div class="grid gap-4 grid-cols-3 service-card-container">
					<!-- 系統整合服務 -->
					<div class="service-card bg-white rounded-xl shadow-lg overflow-hidden" style="background-image: url('/system.png')">
						<div class="service-overlay"></div>
						<div class="service-content flex items-end aspect-[2/3] p-4 relative z-10">
							<h3 class="font-bold text-base md:text-lg lg:text-xl text-white drop-shadow-lg">系統整合服務</h3>
						</div>
					</div>

					<!-- AI 安防解決方案 -->
					<div class="service-card bg-white rounded-xl shadow-lg overflow-hidden" style="background-image: url('/ai-solution.png')">
						<div class="service-overlay"></div>
						<div class="service-content flex items-end aspect-[2/3] p-4 relative z-10">
							<h3 class="font-bold text-base md:text-lg lg:text-xl text-white drop-shadow-lg">AI 安防解決方案</h3>
						</div>
					</div>

					<!-- 專案顧問與技術支援 -->
					<div class="service-card bg-white rounded-xl shadow-lg overflow-hidden" style="background-image: url('/consultation.png')">
						<div class="service-overlay"></div>
						<div class="service-content flex items-end aspect-[2/3] p-4 relative z-10">
							<h3 class="font-bold text-base md:text-lg lg:text-xl text-white drop-shadow-lg">專案顧問與技術支援</h3>
						</div>
					</div>
				</div>
			</div>

			<!-- Part 3: Industries -->
			<div class="space-y-8 min-h-[80vh] flex flex-col justify-center">
				<header class="text-center industries-header">
					<h2 class="text-3xl md:text-4xl lg:text-5xl font-extrabold">客戶的真實體驗</h2>
					<p class="text-lg md:text-xl lg:text-2xl tracking-wide text-gray-400 mt-4">以真實成效與見證，呈現整合帶來的改變</p>
				</header>

				<!-- 專業能力／成就 -->
				<section>
					<h3 class="text-xl md:text-2xl font-extrabold mb-4">專業能力／成就</h3>
					<div class="grid gap-4 md:grid-cols-2 ability-container">
						<div class="bg-white rounded-xl p-6 shadow-lg ability-card">
							<p class="font-semibold mb-2">多領域背景</p>
							<p class="text-gray-500">團隊具備 AI、安防、系統整合的多領域背景</p>
						</div>
						<div class="bg-white rounded-xl p-6 shadow-lg ability-card">
							<p class="font-semibold mb-2">實戰導入經驗</p>
							<p class="text-gray-500">成功導入數個中大型客戶專案</p>
						</div>
					</div>
				</section>

				<!-- 成功案例指標 -->
				<section>
					<h3 class="text-xl md:text-2xl font-extrabold mb-4">成功案例</h3>
					<div class="grid gap-4 md:grid-cols-2 case-container">
						<div class="bg-white rounded-xl p-6 shadow-lg case-card">
							<p class="text-3xl font-black">誤報率 <span class="gradient-text">-30%</span></p>
							<p class="mt-2 text-gray-500">協助某工廠將安防事件誤報率降低 30%</p>
						</div>
						<div class="bg-white rounded-xl p-6 shadow-lg case-card">
							<p class="text-3xl font-black"><span class="gradient-text">+4 小時/天</span></p>
							<p class="mt-2 text-gray-500">物流中心藉由系統整合，每日可節省人力 4 小時</p>
						</div>
					</div>
				</section>
			</div>
		</div>

		<div class="hidden lg:block lg:sticky top-0 h-screen lg:col-span-5">
			<div class="w-full h-full flex items-center justify-center">
				<MorphAnimation :progress="progress" />
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
const leftPanel = ref<HTMLElement | null>(null);
const progress = ref(0);
let ctx: gsap.Context;

onMounted(() => {
	if (!leftPanel.value || !container.value) return;

	ctx = gsap.context(() => {
		// 共用的 ScrollTrigger 配置
		const scrollTriggerConfig = { start: "top 80%" };

		// Timeline for the morph animation progress
		ScrollTrigger.create({
			trigger: leftPanel.value,
			start: "top top",
			end: "bottom bottom",
			scrub: true,
			onUpdate: (self) => {
				progress.value = self.progress;
			}
		});

		// Part 1: Hero - 分層動畫
		const heroTimeline = gsap.timeline({
			scrollTrigger: { trigger: ".hero-content", ...scrollTriggerConfig }
		});

		heroTimeline
			.to(".hero-title-line1", { opacity: 1, y: 0, duration: 1 })
			.to(".hero-title-line2", { opacity: 1, y: 0, duration: 1 }, "-=0.8")
			.to(".hero-subtitle", { opacity: 1, y: 0, duration: 1 }, "-=0.8")
			.to(".hero-logo", { opacity: 1, scale: 1, y: 0, duration: 1 }, "-=0.4");

		// Part 2: Services
		const servicesTimeline = gsap.timeline({
			scrollTrigger: { trigger: ".services-header", ...scrollTriggerConfig }
		});

		servicesTimeline
			.to(".services-header", { opacity: 1, y: 0, duration: 1 })
			.to(".service-card", { opacity: 1, scale: 1, y: 0, duration: 0.5, stagger: 0.2 }, "-=0.5");

		// Part 3: Industries
		const industriesTimeline = gsap.timeline({
			scrollTrigger: { trigger: ".industries-header", ...scrollTriggerConfig }
		});

		industriesTimeline
			.to(".industries-header", { opacity: 1, y: 0, duration: 1 })
			.to(".ability-card", { opacity: 1, y: 0, duration: 0.5, stagger: 0.2 }, "-=0.5")
			.to(".case-card", { opacity: 1, y: 0, duration: 0.5, stagger: 0.2 }, "-=0.3");
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

/* 服務卡片樣式 */
.service-card {
	background-size: cover;
	background-position: center;
	background-repeat: no-repeat;
	position: relative;
	opacity: 0;
	transform: translateY(50px) scale(0.9);
}

.service-overlay {
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background: linear-gradient(to bottom, rgba(0, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.2) 40%, rgba(255, 0, 0, 0.2) 100%);
	border-radius: 0.75rem;
}

/* 防止首次渲染閃爍 - 統一初始狀態 */
.hero-title-line1,
.hero-title-line2,
.hero-subtitle,
.hero-logo,
.services-header,
.industries-header,
.ability-card,
.case-card {
	opacity: 0;
	transform: translateY(50px);
}

.hero-logo {
	transform: translateY(-25px) scale(0.7);
}
</style>
