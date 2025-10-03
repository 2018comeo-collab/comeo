<template>
	<div>
		<StorySection />
		<SupplierSection />
		<PortfolioSection />
		<ContactSection />
	</div>
</template>

<script setup>
// 首頁 SEO 設定
useHead({
	title: "蝶蛹科技 Comeo Technology — 系統整合與數位轉型",
	meta: [
		{
			name: "description",
			content: "蝶蛹科技（Comeo Technology）專注 SI 系統整合，服務建商與中端企業，提供 ERP/CRM 整合、BIM 應用、雲端遷移與資安檢視等解決方案。"
		},
		{ name: "keywords", content: "系統整合,SI,數位轉型,ERP,CRM,BIM,雲端遷移,資安,建商,中端企業,蝶蛹科技" }
	]
});
</script>
