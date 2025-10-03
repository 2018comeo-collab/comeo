<template>
	<!-- 統一的 SEO 優化組件 -->
	<div>
		<!-- 隱藏的 SEO 內容，供搜尋引擎爬取 -->
		<div class="sr-only">
			<slot name="seo-content">
				<!-- 預設 SEO 內容 -->
				<h1>蝶蛹科技 Comeo Technology - 系統整合與數位轉型專家</h1>
				<h2>關於蝶蛹科技</h2>
				<p>蝶蛹科技（Comeo Technology）是一家專注於系統整合（SI）的科技公司，為建商與中端企業提供專業的數位轉型解決方案。</p>

				<h2>服務項目</h2>
				<ul>
					<li>ERP/CRM 整合服務</li>
					<li>BIM 建築資訊模型應用</li>
					<li>雲端遷移與優化</li>
					<li>資安檢視與改善建議</li>
					<li>智慧建築解決方案</li>
					<li>系統整合諮詢</li>
				</ul>

				<h2>合作夥伴</h2>
				<p>與遠岫科技等知名企業合作，提供全方位的智慧安全解決方案，包含人臉辨識門禁、智慧對講、影像監控等12大智慧方案。</p>

				<h2>實績案例</h2>
				<ul>
					<li>辦公大樓智慧化升級</li>
					<li>物流中心安全監控</li>
					<li>零售服務智慧化</li>
					<li>建築智慧化整合</li>
				</ul>

				<h2>聯絡我們</h2>
				<p>歡迎聯絡蝶蛹科技，獲取專業的系統整合諮詢服務。我們提供免費諮詢，協助企業進行數位轉型。</p>
			</slot>
		</div>
	</div>
</template>

<script setup lang="ts">
// 公司資訊結構化資料
const companyData = {
	"@context": "https://schema.org",
	"@type": "Organization",
	name: "蝶蛹科技 Comeo Technology",
	alternateName: "Comeo Technology",
	description: "專注 SI 系統整合，服務建商與中端企業，提供 ERP/CRM 整合、BIM 應用、雲端遷移與資安檢視等解決方案",
	url: "https://comeo.tech",
	logo: "https://comeo.tech/comeo-logo.png",
	image: "https://comeo.tech/og-cover.png",
	telephone: "+886-2-1234-5678",
	email: "contact@comeo.tech",
	address: {
		"@type": "PostalAddress",
		addressCountry: "TW",
		addressRegion: "台北市",
		addressLocality: "信義區"
	},
	sameAs: ["https://www.linkedin.com/company/comeo-technology", "https://www.facebook.com/comeo.technology"],
	foundingDate: "2020",
	numberOfEmployees: "10-50",
	industry: "資訊科技服務",
	serviceArea: {
		"@type": "GeoCircle",
		geoMidpoint: {
			"@type": "GeoCoordinates",
			latitude: "25.0330",
			longitude: "121.5654"
		},
		geoRadius: "50000"
	},
	hasOfferCatalog: {
		"@type": "OfferCatalog",
		name: "系統整合服務",
		itemListElement: [
			{
				"@type": "Offer",
				itemOffered: {
					"@type": "Service",
					name: "ERP/CRM 整合",
					description: "企業資源規劃與客戶關係管理系統整合服務"
				}
			},
			{
				"@type": "Offer",
				itemOffered: {
					"@type": "Service",
					name: "BIM 應用",
					description: "建築資訊模型應用與整合服務"
				}
			},
			{
				"@type": "Offer",
				itemOffered: {
					"@type": "Service",
					name: "雲端遷移",
					description: "企業系統雲端遷移與優化服務"
				}
			},
			{
				"@type": "Offer",
				itemOffered: {
					"@type": "Service",
					name: "資安檢視",
					description: "資訊安全評估與改善建議服務"
				}
			}
		]
	}
};

// 網站結構化資料
const websiteData = {
	"@context": "https://schema.org",
	"@type": "WebSite",
	name: "蝶蛹科技 Comeo Technology",
	url: "https://comeo.tech",
	description: "專為建商與中端企業的 SI 服務與數位轉型夥伴",
	publisher: {
		"@type": "Organization",
		name: "蝶蛹科技 Comeo Technology"
	},
	potentialAction: {
		"@type": "SearchAction",
		target: "https://comeo.tech/search?q={search_term_string}",
		"query-input": "required name=search_term_string"
	}
};

// 網頁結構化資料
const webpageData = {
	"@context": "https://schema.org",
	"@type": "WebPage",
	name: "蝶蛹科技 Comeo Technology",
	description: "專注 SI 系統整合，服務建商與中端企業的數位轉型夥伴",
	url: "https://comeo.tech",
	mainEntity: {
		"@type": "Organization",
		name: "蝶蛹科技 Comeo Technology",
		description: "系統整合與數位轉型專家"
	},
	breadcrumb: {
		"@type": "BreadcrumbList",
		itemListElement: [
			{
				"@type": "ListItem",
				position: 1,
				name: "首頁",
				item: "https://comeo.tech"
			}
		]
	}
};

// 合併所有結構化資料
const structuredData = JSON.stringify([companyData, websiteData, webpageData]);

// 使用 useHead 動態插入完整的 SEO 設定
useHead({
	title: "蝶蛹科技 Comeo Technology — 系統整合與數位轉型",
	meta: [
		{
			name: "description",
			content: "蝶蛹科技（Comeo Technology）專注 SI 系統整合，服務建商與中端企業，提供 ERP/CRM 整合、BIM 應用、雲端遷移與資安檢視等解決方案。"
		},
		{ name: "keywords", content: "系統整合,SI,數位轉型,ERP,CRM,BIM,雲端遷移,資安,建商,中端企業" },
		{ name: "author", content: "蝶蛹科技 Comeo Technology" },
		{ name: "geo.region", content: "TW" },
		{ name: "geo.placename", content: "台灣" },
		{ property: "og:type", content: "website" },
		{ property: "og:title", content: "蝶蛹科技 Comeo Technology — 系統整合與數位轉型" },
		{ property: "og:description", content: "專為建商與中端企業的 SI 服務與數位轉型夥伴。" },
		{ property: "og:image", content: "/og-cover.png" },
		{ property: "og:locale", content: "zh_TW" },
		{ property: "og:site_name", content: "蝶蛹科技 Comeo Technology" },
		{ property: "og:url", content: "https://comeo.tech" },
		{ name: "twitter:card", content: "summary_large_image" },
		{ name: "twitter:title", content: "蝶蛹科技 Comeo Technology — 系統整合與數位轉型" },
		{ name: "twitter:description", content: "專為建商與中端企業的 SI 服務與數位轉型夥伴。" },
		{ name: "twitter:image", content: "/og-cover.png" }
	],
	link: [
		{ rel: "canonical", href: "https://comeo.tech" },
		{ rel: "alternate", hreflang: "zh-TW", href: "https://comeo.tech" }
	],
	script: [
		{
			type: "application/ld+json",
			innerHTML: structuredData
		}
	]
});
</script>

<style scoped>
.sr-only {
	position: absolute;
	width: 1px;
	height: 1px;
	padding: 0;
	margin: -1px;
	overflow: hidden;
	clip: rect(0, 0, 0, 0);
	white-space: nowrap;
	border: 0;
}
</style>
