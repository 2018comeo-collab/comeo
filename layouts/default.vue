<template>
	<div id="top">
		<NuxtRouteAnnouncer />
		<SEOOptimized />

		<!-- 品牌背景：以 Logo 的色彩為靈感，營造柔和水彩暈染 -->
		<div class="brand-backdrop" aria-hidden="true">
			<!-- 暖色主筆觸：黃→橙→紅 -->
			<div class="blob warm" />
			<!-- 冷色延伸：藍色筆觸 -->
			<div class="blob cool" />
			<!-- 新芽：綠色點綴 -->
			<div class="blob green" />
			<!-- 柔和光暈與格紋 -->
			<div class="glow" />
			<div class="grid" />
		</div>

		<!-- 導航列 -->
		<nav class="fixed top-0 left-0 right-0 z-50 py-4 transition-transform duration-300" :class="{ '-translate-y-full': isHidden }">
			<div class="container mx-auto px-4 py-2 flex items-center justify-between gap-8">
				<!-- Logo + Company 區塊 -->
				<div class="flex items-center cursor-pointer" @click="scrollToId('top')">
					<NuxtImg
						src="/comeo-logo.png"
						alt="蝶蛹科技 Logo"
						class="w-12 lg:w-16 xl:w-20 aspect-square object-contain"
						loading="eager"
						width="288"
						height="288"
						format="webp"
						quality="70"
						preload
					/>
					<div class="ml-4">
						<div class="font-extrabold text-lg lg:text-xl xl:text-2xl text-gray-900">蝶蛹科技</div>
						<div class="text-sm lg:text-base xl:text-lg text-gray-500 font-medium text-nowrap">Comeo Technology</div>
					</div>
				</div>

				<!-- Navigation 區塊 -->
				<div class="absolute left-1/2 -translate-x-1/2 hidden md:flex justify-center items-center">
					<!-- nav backdrop -->
					<div class="px-8 py-2 rounded-2xl bg-white/30 backdrop-blur-xl border border-white/20 shadow-lg">
						<div class="flex gap-4 lg:gap-8">
							<!-- 關於蝶蛹 -->
							<a
								href="#about"
								@click.prevent="scrollToId('about')"
								class="text-gray-900 font-semibold text-base lg:text-lg xl:text-xl px-4 py-2 rounded-lg transition-all duration-300 hover:text-orange-500 hover:-translate-y-0.5 relative group"
							>
								關於蝶蛹
								<span
									class="absolute bottom-1 left-1/2 w-0 h-0.5 bg-orange-500 rounded-full transition-all duration-300 transform -translate-x-1/2 group-hover:w-3/5"
								></span>
							</a>
							<!-- 合作夥伴 -->
							<a
								href="#partners"
								@click.prevent="scrollToId('partners')"
								class="text-gray-900 font-semibold text-base lg:text-lg xl:text-xl px-4 py-2 rounded-lg transition-all duration-300 hover:text-orange-500 hover:-translate-y-0.5 relative group"
							>
								合作夥伴
								<span
									class="absolute bottom-1 left-1/2 w-0 h-0.5 bg-orange-500 rounded-full transition-all duration-300 transform -translate-x-1/2 group-hover:w-3/5"
								></span>
							</a>
							<!-- 實績案例 -->
							<a
								href="#portfolio"
								@click.prevent="scrollToId('portfolio')"
								class="text-gray-900 font-semibold text-base lg:text-lg xl:text-xl px-4 py-2 rounded-lg transition-all duration-300 hover:text-orange-500 hover:-translate-y-0.5 relative group"
							>
								實績案例
								<span
									class="absolute bottom-1 left-1/2 w-0 h-0.5 bg-orange-500 rounded-full transition-all duration-300 transform -translate-x-1/2 group-hover:w-3/5"
								></span>
							</a>
						</div>
					</div>
				</div>

				<!-- Contact Button 區塊 -->
				<div class="relative group">
					<button
						@click="scrollToId('contact')"
						class="relative overflow-hidden cursor-pointer bg-gradient-to-r from-brand-yellow via-brand-orange to-brand-red text-white font-bold px-4 py-2 lg:px-8 lg:py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5"
					>
						<!-- 內容 -->
						<div class="relative flex items-center justify-center gap-2">
							<!-- 郵件圖示 -->
							<svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path
									d="M3 8L10.89 13.26C11.2187 13.4793 11.6049 13.5963 12 13.5963C12.3951 13.5963 12.7813 13.4793 13.11 13.26L21 8M5 19H19C20.1046 19 21 18.1046 21 17V7C21 5.89543 20.1046 5 19 5H5C3.89543 5 3 5.89543 3 7V17C3 18.1046 3.89543 19 5 19Z"
									stroke="currentColor"
									stroke-width="2"
									fill="none"
								/>
							</svg>

							<!-- 文字 -->
							<span class="text-sm lg:text-base xl:text-lg hidden sm:inline">免費諮詢</span>
							<span class="text-sm sm:hidden">諮詢</span>
						</div>

						<!-- 光澤效果 -->
						<div
							class="absolute inset-0 -top-2 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"
						></div>
					</button>
				</div>
			</div>
		</nav>

		<NuxtPage />
	</div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";

const isHidden = ref(false);

const scrollToId = (id: string) => {
	const el = document.getElementById(id);
	if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
};

const handleScroll = () => {
	const footer = document.getElementById("contact");
	if (!footer) return;

	const footerRect = footer.getBoundingClientRect();
	const windowHeight = window.innerHeight;

	// 當 footer 頂部進入視窗範圍時隱藏導航列
	isHidden.value = footerRect.top <= windowHeight * 0.1;
};

onMounted(() => {
	window.addEventListener("scroll", handleScroll);
	handleScroll(); // 初始檢查
});

onUnmounted(() => {
	window.removeEventListener("scroll", handleScroll);
});
</script>

<style scoped>
/* 品牌背景樣式 */
.brand-backdrop {
	position: fixed;
	inset: 0;
	pointer-events: none;
	z-index: -1;
	background: radial-gradient(1200px 600px at 80% -5%, color-mix(in oklab, theme("colors.brand.yellow") 12%, transparent), transparent 65%),
		radial-gradient(900px 520px at -10% 90%, color-mix(in oklab, theme("colors.brand.blue") 10%, transparent), transparent 65%),
		radial-gradient(600px 360px at 65% 65%, color-mix(in oklab, theme("colors.brand.green") 7%, transparent), transparent 70%), #ffffff;
}

.blob {
	position: absolute;
	filter: blur(60px) saturate(1.12);
	opacity: 0.35;
	mix-blend-mode: multiply;
	transform: translateZ(0);
	animation: drift 26s ease-in-out infinite;
}
.blob.warm {
	width: 52vw;
	height: 52vw;
	min-width: 520px;
	min-height: 520px;
	top: -12vh;
	right: -8vw;
	background: radial-gradient(40% 40% at 60% 30%, theme("colors.brand.yellow"), transparent 60%),
		radial-gradient(38% 38% at 40% 60%, theme("colors.brand.orange"), transparent 70%),
		radial-gradient(32% 32% at 50% 50%, theme("colors.brand.red"), transparent 75%);
	border-radius: 48% 58% 52% 48% / 52% 48% 58% 48%;
}
.blob.cool {
	width: 44vw;
	height: 44vw;
	min-width: 440px;
	min-height: 440px;
	left: -14vw;
	bottom: -10vh;
	background: radial-gradient(42% 42% at 60% 50%, theme("colors.brand.blue"), transparent 70%);
	border-radius: 58% 42% 50% 50% / 46% 54% 46% 54%;
	animation-delay: -6s;
}
.blob.green {
	width: 26vw;
	height: 26vw;
	min-width: 260px;
	min-height: 260px;
	left: 52%;
	top: 48%;
	background: radial-gradient(50% 50% at 50% 50%, theme("colors.brand.green"), transparent 65%);
	border-radius: 40% 60% 50% 50% / 60% 40% 60% 40%;
	animation-delay: -13s;
}

.glow {
	position: absolute;
	inset: 0;
	background: radial-gradient(1200px 1200px at 50% -10%, color-mix(in oklab, #ffffff 15%, theme("colors.brand.yellow")), transparent 60%);
	opacity: 0.35;
	filter: blur(20px);
}

.grid {
	position: absolute;
	inset: 0;
	background-image: linear-gradient(to right, rgba(2, 6, 23, 0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(2, 6, 23, 0.04) 1px, transparent 1px);
	background-size: 28px 28px;
	mix-blend-mode: multiply;
	opacity: 0.35;
}

@keyframes drift {
	0% {
		transform: translate3d(0, 0, 0) rotate(0.2deg) scale(1);
	}
	50% {
		transform: translate3d(0, -1.2%, 0) rotate(-0.6deg) scale(1.02);
	}
	100% {
		transform: translate3d(0, 0, 0) rotate(0.2deg) scale(1);
	}
}
</style>
