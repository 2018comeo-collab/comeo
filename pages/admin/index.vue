<template>
	<div class="container mx-auto px-4 py-8">
		<h1 class="text-3xl font-bold text-gray-900 mb-8">管理後台</h1>

		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
			<!-- 內容管理 -->
			<div class="bg-white rounded-lg shadow-md p-6">
				<h2 class="text-xl font-semibold text-gray-900 mb-4">內容管理</h2>
				<ul class="space-y-2">
					<li><NuxtLink to="/admin/content/story" class="text-blue-600 hover:text-blue-800">公司故事</NuxtLink></li>
					<li><NuxtLink to="/admin/content/services" class="text-blue-600 hover:text-blue-800">服務項目</NuxtLink></li>
					<li><NuxtLink to="/admin/content/portfolio" class="text-blue-600 hover:text-blue-800">案例展示</NuxtLink></li>
				</ul>
			</div>

			<!-- 聯絡管理 -->
			<div class="bg-white rounded-lg shadow-md p-6">
				<h2 class="text-xl font-semibold text-gray-900 mb-4">聯絡管理</h2>
				<ul class="space-y-2">
					<li><NuxtLink to="/admin/contacts" class="text-blue-600 hover:text-blue-800">聯絡訊息</NuxtLink></li>
					<li><NuxtLink to="/admin/leads" class="text-blue-600 hover:text-blue-800">潛在客戶</NuxtLink></li>
				</ul>
			</div>

			<!-- 系統設定 -->
			<div class="bg-white rounded-lg shadow-md p-6">
				<h2 class="text-xl font-semibold text-gray-900 mb-4">系統設定</h2>
				<ul class="space-y-2">
					<li><NuxtLink to="/admin/settings/seo" class="text-blue-600 hover:text-blue-800">SEO 設定</NuxtLink></li>
					<li><NuxtLink to="/admin/settings/analytics" class="text-blue-600 hover:text-blue-800">分析工具</NuxtLink></li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script setup>
// 指定使用 admin layout
definePageMeta({
	layout: "admin"
});

// 管理後台頁面 SEO 設定
useHead({
	title: "管理後台 - 蝶蛹科技",
	meta: [
		{
			name: "description",
			content: "蝶蛹科技管理後台，用於管理網站內容、聯絡訊息和系統設定。"
		},
		{ name: "robots", content: "noindex, nofollow" } // 管理後台不應被搜尋引擎索引
	]
});
</script>
