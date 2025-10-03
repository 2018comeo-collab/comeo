<template>
	<transition name="enter-animation" appear>
		<div class="w-3/4 h-auto rounded-lg overflow-hidden relative">
			<NuxtImg
				src="/taiwan00.png"
				:alt="`台灣圖片(基底) ${progress.toFixed(2)}`"
				class="w-full h-full object-cover select-none pointer-events-none"
				loading="lazy"
				width="1630"
				height="2048"
				format="webp"
				quality="85"
			/>
			<NuxtImg
				src="/taiwan01.png"
				:alt="`台灣圖片(覆蓋) ${progress.toFixed(2)}`"
				class="w-full h-full object-cover absolute inset-0 select-none pointer-events-none transition-opacity duration-300 ease-out"
				:style="{ opacity: overlayOpacity }"
				loading="lazy"
				width="1630"
				height="2048"
				format="webp"
				quality="85"
			/>
		</div>
	</transition>
</template>

<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
	progress: number;
}>();

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));
const smoothstep = (edge0: number, edge1: number, x: number) => {
	const t = clamp((x - edge0) / (edge1 - edge0), 0, 1);
	return t * t * (3 - 2 * t);
};

// 讓 0.4 開始漸變，1.0 完全切換到 taiwan01
const overlayOpacity = computed(() => smoothstep(0.4, 1.0, props.progress));
</script>

<style scoped>
.enter-animation-enter-from {
	opacity: 0;
	transform: translateY(20px) scale(0.95);
	filter: blur(8px);
}

.enter-animation-enter-to {
	opacity: 1;
	transform: translateY(0) scale(1);
	filter: blur(0);
}

.enter-animation-enter-active {
	transition: opacity 0.8s ease, transform 1s cubic-bezier(0.22, 1, 0.36, 1), filter 0.8s ease;
	will-change: opacity, transform, filter;
}

/* 無障礙降級：尊重使用者偏好減少動畫 */
@media (prefers-reduced-motion: reduce) {
	.enter-animation-enter-active {
		transition: opacity 0.3s ease;
	}
	.enter-animation-enter-from,
	.enter-animation-enter-to {
		transform: none;
		filter: none;
	}
}
</style>
