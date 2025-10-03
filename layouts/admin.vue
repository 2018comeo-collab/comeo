<template>
	<div class="min-h-screen bg-gray-50">
		<!-- 管理後台導航 -->
		<nav class="bg-white shadow-sm border-b">
			<div class="container mx-auto px-4 py-4">
				<div class="flex items-center justify-between">
					<div class="flex items-center space-x-4">
						<NuxtLink to="/admin" class="text-xl font-bold text-gray-900"> 管理後台 </NuxtLink>
					</div>
					<div class="flex items-center space-x-4">
						<NuxtLink to="/" class="text-blue-600 hover:text-blue-800"> 返回首頁 </NuxtLink>
					</div>
				</div>
			</div>
		</nav>

		<NuxtPage />
	</div>
</template>

<script setup>
// 管理後台 SEO 設定
useHead({
	title: "管理後台 - 蝶蛹科技",
	meta: [
		{
			name: "description",
			content: "蝶蛹科技管理後台，用於管理網站內容、聯絡訊息和系統設定。"
		},
		{ name: "robots", content: "noindex, nofollow" }
	]
});
</script>
