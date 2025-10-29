<template>
	<footer id="contact" ref="container" class="min-h-screen flex justify-center items-center relative">
		<div class="container mx-auto px-4">
			<div class="grid gap-8 grid-cols-1 lg:grid-cols-2 my-8">
				<!-- 聯絡我們 -->
				<div class="bg-white rounded-2xl p-6 shadow-lg border border-gray-200 contact-info">
					<h4 class="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
						<svg class="w-6 h-6 text-brand-orange" fill="currentColor" viewBox="0 0 20 20">
							<path
								fill-rule="evenodd"
								d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
								clip-rule="evenodd"
							/>
						</svg>
						聯絡我們
					</h4>

					<!-- 聯絡方式 -->
					<div class="space-y-4 lg:space-y-8">
						<!-- 電話 -->
						<div class="flex items-center gap-3 p-4 rounded-xl bg-gradient-to-r from-gray-50 to-gray-100 border border-gray-200">
							<div class="w-14 h-14 bg-gradient-to-br from-brand-orange to-orange-600 rounded-xl flex items-center justify-center">
								<svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
									<path
										d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"
									/>
								</svg>
							</div>
							<div>
								<p class="text-base text-gray-600">電話</p>
								<a href="tel:0920-370-177" class="font-bold text-gray-900 text-xl hover:text-brand-orange transition-colors">0920-370-177</a>
							</div>
						</div>

						<!-- Email -->
						<div class="flex items-center gap-3 p-4 rounded-xl bg-gradient-to-r from-gray-50 to-gray-100 border border-gray-200">
							<div class="w-14 h-14 bg-gradient-to-br from-brand-orange to-orange-600 rounded-xl flex items-center justify-center">
								<svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
									<path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
									<path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
								</svg>
							</div>
							<div>
								<p class="text-base text-gray-600">Email</p>
								<div class="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
									<a href="mailto:stan@comeo.com.tw" class="font-bold text-gray-900 text-xl hover:text-brand-orange transition-colors">stan@comeo.com.tw</a>
									<a href="mailto:jerry@comeo.com.tw" class="font-bold text-gray-900 text-xl hover:text-brand-orange transition-colors">jerry@comeo.com.tw</a>
								</div>
							</div>
						</div>

						<!-- 地址 -->
						<div class="flex items-center gap-3 p-4 rounded-xl bg-gradient-to-r from-gray-50 to-gray-100 border border-gray-200">
							<div class="w-14 h-14 bg-gradient-to-br from-brand-orange to-orange-600 rounded-xl flex items-center justify-center">
								<svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
									<path
										fill-rule="evenodd"
										d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
										clip-rule="evenodd"
									/>
								</svg>
							</div>
							<div class="flex-1">
								<p class="text-base text-gray-600">地址</p>
								<p class="font-bold text-gray-900 text-xl leading-relaxed">23584新北市中和區橋和路122號7樓</p>
							</div>
						</div>

						<!-- 社群媒體 -->
						<div class="flex items-center gap-4 p-5 rounded-xl bg-gradient-to-r from-gray-50 to-gray-100 border border-gray-200">
							<div class="w-14 h-14 bg-gradient-to-br from-brand-orange to-orange-600 rounded-xl flex items-center justify-center">
								<svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
									<path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z" />
									<path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z" />
								</svg>
							</div>
							<div class="flex-1">
								<p class="text-base text-gray-600">社群媒體</p>
								<div class="flex flex-wrap gap-3">
									<a
										href="https://www.facebook.com/ComeoTech"
										target="_blank"
										class="flex items-center gap-2 px-3 py-1.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm"
									>
										<svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
											<path
												fill="#ffffff"
												d="M64 32C28.7 32 0 60.7 0 96L0 416c0 35.3 28.7 64 64 64l98.2 0 0-145.8-52.8 0 0-78.2 52.8 0 0-33.7c0-87.1 39.4-127.5 125-127.5 16.2 0 44.2 3.2 55.7 6.4l0 70.8c-6-.6-16.5-1-29.6-1-42 0-58.2 15.9-58.2 57.2l0 27.8 83.6 0-14.4 78.2-69.3 0 0 145.8 129 0c35.3 0 64-28.7 64-64l0-320c0-35.3-28.7-64-64-64L64 32z"
											/>
										</svg>
										Facebook
									</a>
									<a
										href="https://page.line.me/941uvbfl"
										target="_blank"
										class="flex items-center gap-2 px-3 py-1.5 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors text-sm"
									>
										<svg class="w-[20px] h-[20px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
											<path
												fill="#ffffff"
												d="M375 260.8L375 342.1C375 344.2 373.4 345.8 371.3 345.8L358.3 345.8C357 345.8 355.9 345.1 355.3 344.3L318 294L318 342.2C318 344.3 316.4 345.9 314.3 345.9L301.3 345.9C299.2 345.9 297.6 344.3 297.6 342.2L297.6 260.9C297.6 258.8 299.2 257.2 301.3 257.2L314.2 257.2C315.3 257.2 316.6 257.8 317.2 258.8L354.5 309.1L354.5 260.9C354.5 258.8 356.1 257.2 358.2 257.2L371.2 257.2C373.3 257.1 375 258.8 375 260.7L375 260.8zM281.3 257.1L268.3 257.1C266.2 257.1 264.6 258.7 264.6 260.8L264.6 342.1C264.6 344.2 266.2 345.8 268.3 345.8L281.3 345.8C283.4 345.8 285 344.2 285 342.1L285 260.8C285 258.9 283.4 257.1 281.3 257.1zM249.9 325.2L214.3 325.2L214.3 260.8C214.3 258.7 212.7 257.1 210.6 257.1L197.6 257.1C195.5 257.1 193.9 258.7 193.9 260.8L193.9 342.1C193.9 343.1 194.2 343.9 194.9 344.6C195.6 345.2 196.4 345.6 197.4 345.6L249.6 345.6C251.7 345.6 253.3 344 253.3 341.9L253.3 328.9C253.3 327 251.7 325.2 249.8 325.2L249.9 325.2zM443.6 257.1L391.3 257.1C389.4 257.1 387.6 258.7 387.6 260.8L387.6 342.1C387.6 344 389.2 345.8 391.3 345.8L443.5 345.8C445.6 345.8 447.2 344.2 447.2 342.1L447.2 329C447.2 326.9 445.6 325.3 443.5 325.3L408 325.3L408 311.7L443.5 311.7C445.6 311.7 447.2 310.1 447.2 308L447.2 294.9C447.2 292.8 445.6 291.2 443.5 291.2L408 291.2L408 277.5L443.5 277.5C445.6 277.5 447.2 275.9 447.2 273.8L447.2 260.8C447.1 258.9 445.5 257.1 443.5 257.1L443.6 257.1zM576 157.4L576 483.4C575.9 534.6 533.9 576.1 482.6 576L156.6 576C105.4 575.9 63.9 533.8 64 482.6L64 156.6C64.1 105.4 106.2 63.9 157.4 64L483.4 64C534.6 64.1 576.1 106.1 576 157.4zM505.6 297.5C505.6 214.1 421.9 146.2 319.2 146.2C216.5 146.2 132.8 214.1 132.8 297.5C132.8 372.2 199.1 434.9 288.7 446.8C310.5 451.5 308 459.5 303.1 488.9C302.3 493.6 299.3 507.3 319.2 499C339.1 490.7 426.5 435.8 465.7 390.8C492.7 361.1 505.6 331 505.6 297.7L505.6 297.5z"
											/>
										</svg>
										Line
									</a>
								</div>
							</div>
						</div>
					</div>
				</div>

				<!-- 諮詢表單元件 -->
				<ContactForm />
			</div>

			<!-- 公司品牌區塊 + 導航按鈕 -->
			<div class="bg-white rounded-2xl p-8 pb-0 md:pb-4 mb-16 md:mb-8 shadow-lg border border-gray-200 company-brand">
				<div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 md:gap-8 mb-6">
					<!-- 左側：公司品牌 -->
					<div class="flex items-center gap-6">
						<NuxtImg
							src="/comeo-logo.png"
							alt="蝶蛹科技 Logo"
							class="w-20 h-20 lg:w-24 lg:h-24 object-contain rounded-2xl p-3 shadow-lg border border-gray-200"
							loading="eager"
							width="288"
							height="288"
							format="webp"
							quality="90"
							preload
						/>
						<div>
							<h3 class="text-2xl lg:text-3xl font-extrabold text-gray-900 mb-0 md:mb-1">蝶蛹科技</h3>
							<p class="text-lg text-gray-600 font-medium mb-0 md:mb-2">Comeo Technology</p>
							<p class="text-gray-600 leading-relaxed">
								專為建商與中端企業 <br class="block md:hidden" />
								量身打造系統整合與數位化方案
							</p>
						</div>
					</div>

					<!-- 右側：導航按鈕 -->
					<div class="px-4 md:px-8 py-2 rounded-2xl bg-brand-orange/90 backdrop-blur-xl border border-orange-300/50 shadow-lg">
						<div class="flex justify-center lg:gap-8 whitespace-nowrap">
							<a
								v-for="link in navLinks"
								:key="link.id"
								:href="`#${link.id}`"
								@click.prevent="scrollToId(link.id)"
								class="text-white font-semibold text-base lg:text-lg px-4 py-2 rounded-lg transition-all duration-300 hover:text-yellow-200 hover:-translate-y-0.5 relative group"
							>
								{{ link.label }}
								<span
									class="absolute bottom-1 left-1/2 w-0 h-0.5 bg-yellow-200 rounded-full transition-all duration-300 transform -translate-x-1/2 group-hover:w-3/5"
								></span>
							</a>
						</div>
					</div>
				</div>
			</div>

			<!-- 版權資訊 -->
			<div class="text-center py-4 absolute bottom-2 md:bottom-6 left-0 right-0">
				<p class="text-gray-600 text-sm">© 2025 Comeo Technology. All rights reserved.</p>
			</div>
		</div>
	</footer>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ContactForm from "~/components/ContactForm.vue";

gsap.registerPlugin(ScrollTrigger);

const container = ref<HTMLElement | null>(null);
const route = useRoute();
const router = useRouter();
let ctx: gsap.Context;

// 導航連結配置（與 default.vue 保持一致）
const navLinks = [
	{ id: "about", label: "關於蝶蛹" },
	{ id: "partners", label: "合作夥伴" },
	{ id: "portfolio", label: "實績案例" }
];

const scrollToId = (id: string) => {
	// 如果在首頁，直接滾動到對應元素
	if (route.path === "/") {
		const el = document.getElementById(id);
		if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
	} else {
		// 如果不在首頁，使用 Nuxt 路由跳轉到首頁對應區塊
		router.push(`/#${id}`);
	}
};

onMounted(() => {
	if (!container.value) return;

	ctx = gsap.context(() => {
		// 共用的動畫配置
		const isSmallScreen = window.innerWidth < 1024;

		// Part 1: 聯絡我們 - 從左進入（小螢幕改為從下進入）
		gsap.fromTo(
			".contact-info",
			isSmallScreen
				? {
						opacity: 0,
						x: 0,
						y: 50
				  }
				: {
						opacity: 0,
						x: -50,
						y: 0
				  },
			{
				opacity: 1,
				x: 0,
				y: 0,
				duration: 1,
				scrollTrigger: { trigger: ".contact-info", start: "top 80%" }
			}
		);

		// Part 2: 諮詢表單 - 從右進入（小螢幕改為從下進入）
		gsap.fromTo(
			".contact-form",
			isSmallScreen
				? {
						opacity: 0,
						x: 0,
						y: 50
				  }
				: {
						opacity: 0,
						x: 50,
						y: 0
				  },
			{
				opacity: 1,
				x: 0,
				y: 0,
				duration: 1,
				scrollTrigger: { trigger: ".contact-form", start: "top 80%" }
			}
		);

		// Part 3: 公司品牌區塊 - 由下浮現
		gsap.fromTo(
			".company-brand",
			{
				opacity: 0,
				x: 0,
				y: 50
			},
			{
				opacity: 1,
				x: 0,
				y: 0,
				duration: 1,
				scrollTrigger: { trigger: ".company-brand", start: "top 80%" }
			}
		);
	}, container.value);
});

onUnmounted(() => {
	if (ctx) {
		ctx.revert(); // cleanup
	}
});
</script>

<style scoped>
/* 防止首次渲染閃爍 - 統一初始狀態 */
.contact-info,
.contact-form,
.company-brand {
	opacity: 0;
}
</style>
