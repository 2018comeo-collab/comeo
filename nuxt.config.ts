// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	compatibilityDate: "2025-07-15",
	devtools: { enabled: true },

	modules: ["@nuxt/image", "@nuxtjs/tailwindcss", "@pinia/nuxt", "nuxt-gtag"],

	gtag: { id: "G-LKNE0384JC", config: { defer: true } },

	// 運行時配置 - API 設定
	runtimeConfig: {
		// 私密變數 (僅服務端可存取)
		apiSecret: process.env.API_SECRET || "",
		apiKey: process.env.API_KEY || "",

		// 公開變數 (客戶端和服務端都可存取)
		public: {
			apiBaseUrl: process.env.API_BASE_URL || "https://api.comeo.com.tw",
			storagePath: process.env.STORAGE_PATH || "/storage",
			fileServiceBaseUrl: process.env.NUXT_PUBLIC_FILE_SERVICE_BASE_URL || "https://api.comeo.com.tw"
		}
	},

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
		},
		// 頁面轉場配置
		pageTransition: {
			name: "page",
			mode: "out-in"
		},
		layoutTransition: {
			name: "layout",
			mode: "out-in"
		}
	},
	// 開發伺服器設定 - 允許外部設備連接
	devServer: {
		host: "0.0.0.0", // 監聽所有網路介面
		port: 3000
	},

	// 單頁式網站錨點 SEO 優化
	experimental: {
		payloadExtraction: false // 改善單頁式網站的 SEO
	}
});
