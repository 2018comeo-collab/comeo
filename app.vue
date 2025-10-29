<template>
	<NuxtLayout>
		<NuxtPage :transition="pageTransition" />
	</NuxtLayout>
</template>

<script setup lang="ts">
const route = useRoute();

// 根據路由自動選擇轉場效果
const pageTransition = computed(() => {
	const path = route.path;

	// 案例研究詳情頁使用滑動效果
	if (path.startsWith("/case-studies/") && path !== "/case-studies") {
		return { name: "slide", mode: "out-in" as const };
	}

	// 案例列表頁使用淡入效果
	if (path === "/case-studies") {
		return { name: "fade", mode: "out-in" as const };
	}

	// 首頁使用默認效果（淡入 + 微妙縮放）
	return { name: "page", mode: "out-in" as const };
});
</script>

<style>
/* ==========================================
   默認頁面切換動畫 - 簡單的淡入淡出
   ========================================== */
.page-enter-active,
.page-leave-active {
	transition: opacity 0.4s ease-in-out;
}

.page-enter-from,
.page-leave-to {
	opacity: 0;
}

.page-enter-to,
.page-leave-from {
	opacity: 1;
}

/* ==========================================
   滑動動畫 - 簡單的左右滑動
   ========================================== */
.slide-enter-active,
.slide-leave-active {
	transition: all 0.5s ease-in-out;
}

.slide-enter-from {
	opacity: 0;
	transform: translateX(20px);
}

.slide-leave-to {
	opacity: 0;
	transform: translateX(-20px);
}

.slide-enter-to,
.slide-leave-from {
	opacity: 1;
	transform: translateX(0);
}

/* ==========================================
   淡入淡出動畫 - 純粹的透明度變化
   ========================================== */
.fade-enter-active,
.fade-leave-active {
	transition: opacity 0.4s ease-in-out;
}

.fade-enter-from,
.fade-leave-to {
	opacity: 0;
}

.fade-enter-to,
.fade-leave-from {
	opacity: 1;
}

/* ==========================================
   縮放動畫 - 簡單的縮放效果
   ========================================== */
.scale-enter-active,
.scale-leave-active {
	transition: all 0.4s ease-in-out;
}

.scale-enter-from {
	opacity: 0;
	transform: scale(0.98);
}

.scale-leave-to {
	opacity: 0;
	transform: scale(1.02);
}

.scale-enter-to,
.scale-leave-from {
	opacity: 1;
	transform: scale(1);
}

/* ==========================================
   優化頁面切換體驗
   ========================================== */
.layout-enter-active,
.layout-leave-active {
	transition: all 0.4s ease-in-out;
}

/* 防止轉場時出現滾動條閃爍 */
.page-enter-active,
.page-leave-active,
.slide-enter-active,
.slide-leave-active,
.fade-enter-active,
.fade-leave-active,
.scale-enter-active,
.scale-leave-active {
	overflow-x: hidden;
}
</style>
