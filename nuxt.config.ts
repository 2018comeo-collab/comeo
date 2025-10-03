// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	compatibilityDate: "2025-07-15",
	devtools: { enabled: true },

	modules: ["@nuxt/image", "@nuxtjs/tailwindcss"],

	// 單頁式網站 SEO 優化配置
	ssr: true, // 啟用服務端渲染
	nitro: {
		prerender: {
			routes: ["/"] // 預渲染首頁
		}
	},
	tailwindcss: {
		cssPath: "~/assets/tailwind.css"
	},

	app: {
		head: {
			title: "蝶蛹科技 Comeo Technology",
			meta: [
				{ name: "viewport", content: "width=device-width, initial-scale=1" },
				{ name: "robots", content: "index, follow" },
				{ name: "language", content: "zh-TW" }
			],
			link: [
				{ rel: "icon", type: "image/png", href: "/comeo-logo.png" },
				{ rel: "preconnect", href: "https://fonts.googleapis.com" },
				{ rel: "preconnect", href: "https://fonts.gstatic.com", crossorigin: "" }
			]
		}
	},
	// 單頁式網站錨點 SEO 優化
	experimental: {
		payloadExtraction: false // 改善單頁式網站的 SEO
	}
});
