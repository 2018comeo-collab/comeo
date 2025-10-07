<template>
	<div class="bg-white rounded-2xl p-6 shadow-lg border border-gray-200 contact-form overflow-hidden">
		<h4 class="text-xl font-bold text-gray-900 mb-6">諮詢表單</h4>
		<form class="space-y-4" @submit.prevent="onSubmit" role="form" aria-label="諮詢表單">
			<!-- 錯誤訊息 -->
			<div v-if="submitError" class="bg-red-50 border border-red-200 rounded-lg p-4 mb-4" role="alert" aria-live="assertive">
				<div class="flex items-start gap-3">
					<svg class="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
						<path
							fill-rule="evenodd"
							d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
							clip-rule="evenodd"
						/>
					</svg>
					<div class="flex-1">
						<h3 class="text-sm font-medium text-red-800 mb-1">提交失敗</h3>
						<p class="text-sm text-red-700">{{ submitError }}</p>
					</div>
					<button @click="clearContactError()" class="text-red-400 hover:text-red-600 transition-colors" aria-label="關閉錯誤訊息">
						<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
							<path
								fill-rule="evenodd"
								d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
								clip-rule="evenodd"
							/>
						</svg>
					</button>
				</div>
			</div>

			<!-- 第一行：公司名稱 / 聯絡人 -->
			<div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
				<div>
					<label for="company" class="block text-sm font-medium text-gray-700 mb-2"> 公司名稱 <span class="text-red-500">*</span> </label>
					<input
						id="company"
						v-model="state.company"
						@input="clearError('company')"
						type="text"
						placeholder="請輸入公司名稱"
						:aria-invalid="!!errors.company"
						:aria-describedby="errors.company ? 'company-error' : undefined"
						required
						:class="[
							'w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-orange focus:border-transparent transition-colors',
							errors.company ? 'border-red-300 bg-red-50' : 'border-gray-300'
						]"
					/>
					<p v-if="errors.company" id="company-error" class="text-red-600 text-sm mt-1" role="alert">{{ errors.company }}</p>
				</div>
				<div>
					<label for="name" class="block text-sm font-medium text-gray-700 mb-2"> 聯絡人 <span class="text-red-500">*</span> </label>
					<input
						id="name"
						v-model="state.name"
						@input="clearError('name')"
						type="text"
						placeholder="請輸入聯絡人姓名"
						:aria-invalid="!!errors.name"
						:aria-describedby="errors.name ? 'name-error' : undefined"
						required
						:class="[
							'w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-orange focus:border-transparent transition-colors',
							errors.name ? 'border-red-300 bg-red-50' : 'border-gray-300'
						]"
					/>
					<p v-if="errors.name" id="name-error" class="text-red-600 text-sm mt-1" role="alert">{{ errors.name }}</p>
				</div>
			</div>

			<!-- 第二行：聯絡電話 / 聯絡信箱 -->
			<div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
				<div>
					<label for="phone" class="block text-sm font-medium text-gray-700 mb-2"> 聯絡電話 <span class="text-red-500">*</span> </label>
					<input
						id="phone"
						v-model="state.phone"
						@input="clearError('phone')"
						type="tel"
						placeholder="請輸入聯絡電話"
						:aria-invalid="!!errors.phone"
						:aria-describedby="errors.phone ? 'phone-error' : undefined"
						required
						:class="[
							'w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-orange focus:border-transparent transition-colors',
							errors.phone ? 'border-red-300 bg-red-50' : 'border-gray-300'
						]"
					/>
					<p v-if="errors.phone" id="phone-error" class="text-red-600 text-sm mt-1" role="alert">{{ errors.phone }}</p>
				</div>
				<div>
					<label for="email" class="block text-sm font-medium text-gray-700 mb-2"> 聯絡信箱 <span class="text-red-500">*</span> </label>
					<input
						id="email"
						v-model="state.email"
						@input="clearError('email')"
						type="email"
						placeholder="請輸入聯絡信箱"
						:aria-invalid="!!errors.email"
						:aria-describedby="errors.email ? 'email-error' : undefined"
						required
						:class="[
							'w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-orange focus:border-transparent transition-colors',
							errors.email ? 'border-red-300 bg-red-50' : 'border-gray-300'
						]"
					/>
					<p v-if="errors.email" id="email-error" class="text-red-600 text-sm mt-1" role="alert">{{ errors.email }}</p>
				</div>
			</div>

			<!-- 第三行：需求描述 -->
			<div>
				<label for="message" class="block text-sm font-medium text-gray-700 mb-2"> 需求描述 </label>
				<textarea
					id="message"
					v-model="state.message"
					@input="clearError('message')"
					placeholder="請簡述您的需求..."
					rows="4"
					:aria-invalid="!!errors.message"
					:aria-describedby="errors.message ? 'message-error' : undefined"
					:class="[
						'w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-orange focus:border-transparent resize-vertical transition-colors',
						errors.message ? 'border-red-300 bg-red-50' : 'border-gray-300'
					]"
				></textarea>
				<p v-if="errors.message" id="message-error" class="text-red-600 text-sm mt-1" role="alert">{{ errors.message }}</p>
			</div>

			<!-- 第四行：檔案上傳 -->
			<div>
				<label for="files" class="block text-sm font-medium text-gray-700 mb-2">
					附加檔案 <span class="text-gray-500 text-xs">(可選，最多 3 個檔案，每個檔案不超過 5MB，支援：圖片、PDF、Word、Excel、文字檔案)</span>
					<span v-if="selectedFiles.length > 0" class="text-blue-600 text-xs ml-2"> 已選擇 {{ selectedFiles.length }}/3 個檔案 </span>
				</label>

				<!-- 檔案上傳區域 -->
				<div class="flex items-center gap-3">
					<!-- 檔案選擇按鈕 -->
					<label
						for="files"
						:class="[
							'inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors',
							selectedFiles.length >= 3 ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-brand-orange text-white hover:bg-orange-600 cursor-pointer'
						]"
					>
						{{ selectedFiles.length >= 3 ? "已達上限" : "選擇檔案" }}
					</label>

					<!-- 隱藏的檔案輸入 -->
					<input
						id="files"
						ref="fileInput"
						@change="handleFileChange"
						@input="clearError('files')"
						type="file"
						multiple
						accept="image/*,.pdf,.doc,.docx,.xls,.xlsx,.txt"
						:disabled="selectedFiles.length >= 3"
						:aria-invalid="!!errors.files"
						:aria-describedby="errors.files ? 'files-error' : undefined"
						class="hidden"
					/>

					<!-- 檔案標籤 -->
					<div v-if="selectedFiles.length > 0" class="flex flex-wrap gap-2">
						<div
							v-for="(file, index) in selectedFiles"
							:key="index"
							class="inline-flex items-center gap-2 bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
						>
							<svg class="w-3 h-3 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
								<path
									fill-rule="evenodd"
									d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2H7a1 1 0 100-2H7z"
									clip-rule="evenodd"
								/>
							</svg>
							<span class="max-w-24 truncate" :title="file.name">{{ file.name }}</span>
							<button @click="removeFile(index)" type="button" class="text-gray-400 hover:text-red-500 transition-colors ml-1" aria-label="移除檔案">
								<svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
									<path
										fill-rule="evenodd"
										d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
										clip-rule="evenodd"
									/>
								</svg>
							</button>
						</div>
					</div>
				</div>

				<p v-if="errors.files" id="files-error" class="text-red-600 text-sm mt-1" role="alert">{{ errors.files }}</p>
			</div>

			<button
				type="submit"
				:disabled="isSubmitting"
				:aria-label="isSubmitting ? '正在送出表單，請稍候' : '送出諮詢表單'"
				:class="[
					'w-full font-semibold py-4 px-6 rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-brand-orange focus:ring-offset-2 flex items-center justify-center gap-3 relative overflow-hidden',
					isSubmitting
						? 'bg-gradient-to-r from-gray-400 to-gray-500 text-gray-200 cursor-not-allowed'
						: 'bg-gradient-to-r from-brand-orange to-orange-600 text-white hover:from-orange-600 hover:to-orange-700 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]'
				]"
			>
				<!-- 載入動畫背景 -->
				<div v-if="isSubmitting" class="absolute inset-0 bg-gradient-to-r from-orange-400 to-orange-600 opacity-20 animate-pulse"></div>

				<!-- 文字內容 -->
				<span class="relative z-10 text-lg">
					{{ isSubmitting ? "送出中..." : showSuccessMessage ? "送出成功" : "送出諮詢" }}
				</span>

				<!-- 載入圖示 -->
				<svg v-if="isSubmitting" class="animate-spin w-6 h-6 relative z-10" fill="none" viewBox="0 0 24 24" aria-hidden="true">
					<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
					<path
						class="opacity-75"
						fill="currentColor"
						d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
					></path>
				</svg>

				<!-- 成功圖示 -->
				<svg v-else-if="showSuccessMessage" class="w-6 h-6 relative z-10" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
					<path
						fill-rule="evenodd"
						d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
						clip-rule="evenodd"
					/>
				</svg>

				<!-- 預設圖示 -->
				<svg v-else class="w-6 h-6 relative z-10 rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
				</svg>
			</button>
		</form>
	</div>

	<!-- 成功訊息 Dialog -->
	<Teleport to="body">
		<Transition
			enter-active-class="transition-all duration-300 ease-out"
			enter-from-class="opacity-0"
			enter-to-class="opacity-100"
			leave-active-class="transition-all duration-200 ease-in"
			leave-from-class="opacity-100"
			leave-to-class="opacity-0"
		>
			<div v-if="showSuccessMessage" class="fixed inset-0 z-50 flex items-center justify-center p-4" @click.self="showSuccessMessage = false">
				<!-- 背景遮罩 -->
				<div class="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"></div>

				<!-- Dialog 內容 -->
				<Transition
					enter-active-class="transition-all duration-300 ease-out"
					enter-from-class="opacity-0 scale-95 translate-y-4"
					enter-to-class="opacity-100 scale-100 translate-y-0"
					leave-active-class="transition-all duration-200 ease-in"
					leave-from-class="opacity-100 scale-100 translate-y-0"
					leave-to-class="opacity-0 scale-95 translate-y-4"
				>
					<div
						v-if="showSuccessMessage"
						class="relative bg-white rounded-2xl p-8 shadow-2xl max-w-md w-full mx-4"
						role="dialog"
						aria-modal="true"
						aria-labelledby="success-title"
					>
						<!-- 關閉按鈕 -->
						<button
							@click="showSuccessMessage = false"
							class="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
							aria-label="關閉對話框"
						>
							<svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
								<path
									fill-rule="evenodd"
									d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
									clip-rule="evenodd"
								/>
							</svg>
						</button>

						<!-- 成功內容 -->
						<div class="text-center">
							<!-- 成功圖示 -->
							<div class="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
								<svg class="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 20 20">
									<path
										fill-rule="evenodd"
										d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
										clip-rule="evenodd"
									/>
								</svg>
							</div>

							<!-- 標題 -->
							<h3 id="success-title" class="text-2xl font-bold text-gray-900 mb-4">提交成功！</h3>

							<!-- 訊息 -->
							<p class="text-gray-700 mb-6">已收到您的諮詢需求！</p>

							<!-- 額外資訊 -->
							<div class="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
								<p class="text-sm text-green-700">我們的專業團隊會在 24 小時內回覆您的諮詢，請保持聯絡電話暢通。</p>
							</div>

							<!-- 進度條 -->
							<div v-if="autoClose && countdown > 0" class="mb-4">
								<div class="w-full bg-green-200 rounded-full h-2 mb-2">
									<div
										class="bg-green-500 h-2 rounded-full transition-all duration-1000 ease-linear"
										:style="{ width: `${(countdown / autoCloseDuration) * 100}%` }"
									></div>
								</div>
								<p class="text-xs text-green-600">{{ countdown }} 秒後自動關閉</p>
							</div>

							<!-- 確認按鈕 -->
							<button
								@click="showSuccessMessage = false"
								class="w-full bg-brand-orange text-white py-3 px-6 rounded-lg font-semibold hover:bg-orange-600 transition-colors"
							>
								確認
							</button>
						</div>
					</div>
				</Transition>
			</div>
		</Transition>
	</Teleport>
</template>

<script setup lang="ts">
import { reactive, ref, watch, onUnmounted, Teleport, Transition } from "vue";
import { useContact } from "~/composables/useContact";

interface ContactState {
	company: string;
	name: string;
	phone: string;
	email: string;
	message: string;
}

interface FormErrors {
	company?: string;
	name?: string;
	phone?: string;
	email?: string;
	message?: string;
	files?: string;
}

// 使用 useContact composable
const { isSubmitting, submitError, submitSimpleContactForm, clearError: clearContactError } = useContact();

const state = reactive<ContactState>({
	company: "",
	name: "",
	phone: "",
	email: "",
	message: ""
});

const errors = reactive<FormErrors>({});
const showSuccessMessage = ref(false);

// 檔案上傳相關
const selectedFiles = ref<File[]>([]);
const fileInput = ref<HTMLInputElement | null>(null);

// 自動關閉設定
const autoClose = ref(true);
const autoCloseDuration = ref(8); // 8 秒後自動關閉
const countdown = ref(autoCloseDuration.value);
let countdownTimer: NodeJS.Timeout | null = null;

// 驗證規則
const validateForm = (): boolean => {
	// 清除之前的錯誤
	Object.keys(errors).forEach((key) => {
		delete errors[key as keyof FormErrors];
	});

	let isValid = true;

	// 公司名稱驗證
	if (!state.company.trim()) {
		errors.company = "請輸入公司名稱";
		isValid = false;
	}

	// 聯絡人驗證
	if (!state.name.trim()) {
		errors.name = "請輸入聯絡人姓名";
		isValid = false;
	}

	// 電話驗證
	if (!state.phone.trim()) {
		errors.phone = "請輸入聯絡電話";
		isValid = false;
	} else if (!/^[\d\-\+\(\)\s]+$/.test(state.phone)) {
		errors.phone = "請輸入有效的電話號碼";
		isValid = false;
	}

	// 電子郵件驗證
	if (!state.email.trim()) {
		errors.email = "請輸入聯絡信箱";
		isValid = false;
	} else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(state.email)) {
		errors.email = "請輸入有效的電子郵件格式";
		isValid = false;
	}

	// 需求描述驗證（可選填）
	// 移除字數限制，讓使用者自由填寫

	// 檔案驗證
	if (selectedFiles.value.length > 3) {
		errors.files = "最多只能上傳 3 個檔案";
		isValid = false;
	}

	// 檢查檔案格式和大小
	const maxFileSize = 5 * 1024 * 1024; // 5MB
	const allowedTypes = [
		"image/jpeg",
		"image/jpg",
		"image/png",
		"image/gif",
		"image/webp",
		"application/pdf",
		"application/msword",
		"application/vnd.openxmlformats-officedocument.wordprocessingml.document",
		"application/vnd.ms-excel",
		"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
		"text/plain"
	];

	selectedFiles.value.forEach((file) => {
		if (file.size > maxFileSize) {
			errors.files = `檔案 ${file.name} 大小超過 5MB 限制`;
			isValid = false;
		}
		if (!allowedTypes.includes(file.type)) {
			errors.files = `檔案 ${file.name} 格式不支援，請選擇圖片、PDF、Word、Excel 或文字檔案`;
			isValid = false;
		}
	});

	return isValid;
};

const onSubmit = async () => {
	// 驗證表單
	if (!validateForm()) {
		return;
	}

	try {
		// 根據域名判斷網站類型
		const siteType = window.location.hostname.includes("comeo") ? "comeo" : "yenshow";

		// 使用 useContact composable 提交表單
		const contactData = {
			name: state.name,
			phone: state.phone,
			email: state.email,
			company: state.company,
			message: state.message,
			files: selectedFiles.value, // 添加檔案
			siteType: siteType // 添加網站類型
		};

		const result = await submitSimpleContactForm(contactData);

		// 如果 API 沒有拋出錯誤，就視為成功
		// 後端使用 successResponse 回傳，前端不需要檢查 success 屬性
		console.log("API 回應:", result);

		// 顯示成功訊息
		showSuccessMessage.value = true;

		// 重置表單
		state.company = "";
		state.name = "";
		state.phone = "";
		state.email = "";
		state.message = "";
		selectedFiles.value = [];
		if (fileInput.value) {
			fileInput.value.value = "";
		}

		// 清除所有錯誤
		Object.keys(errors).forEach((key) => {
			delete errors[key as keyof FormErrors];
		});
	} catch (error: any) {
		console.error("表單提交失敗:", error);
		// 錯誤訊息會透過 submitError 自動顯示，不需要 alert
	}
};

// 清除特定欄位的錯誤
const clearError = (field: keyof FormErrors) => {
	if (errors[field]) {
		delete errors[field];
	}
};

// 監聽成功訊息顯示，啟動或清除計時器
watch(
	() => showSuccessMessage.value,
	(newShow) => {
		if (newShow && autoClose.value) {
			startCountdown();
		} else {
			clearCountdown();
		}
	}
);

const startCountdown = () => {
	countdown.value = autoCloseDuration.value;
	countdownTimer = setInterval(() => {
		countdown.value--;
		if (countdown.value <= 0) {
			showSuccessMessage.value = false;
		}
	}, 1000);
};

const clearCountdown = () => {
	if (countdownTimer) {
		clearInterval(countdownTimer);
		countdownTimer = null;
	}
};

// 檔案處理函數
const handleFileChange = (event: Event) => {
	const target = event.target as HTMLInputElement;
	if (target.files) {
		const newFiles = Array.from(target.files);

		// 檢查總檔案數量是否超過限制
		if (selectedFiles.value.length + newFiles.length > 3) {
			errors.files = "最多只能上傳 3 個檔案";
			return;
		}

		// 檢查檔案大小和格式
		const maxFileSize = 5 * 1024 * 1024; // 5MB
		const allowedTypes = [
			"image/jpeg",
			"image/jpg",
			"image/png",
			"image/gif",
			"image/webp",
			"application/pdf",
			"application/msword",
			"application/vnd.openxmlformats-officedocument.wordprocessingml.document",
			"application/vnd.ms-excel",
			"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
			"text/plain"
		];

		for (const file of newFiles) {
			if (file.size > maxFileSize) {
				errors.files = `檔案 ${file.name} 大小超過 5MB 限制`;
				return;
			}
			if (!allowedTypes.includes(file.type)) {
				errors.files = `檔案 ${file.name} 格式不支援，請選擇圖片、PDF、Word、Excel 或文字檔案`;
				return;
			}
		}

		// 追加新檔案到現有列表
		selectedFiles.value = [...selectedFiles.value, ...newFiles];
		clearError("files");

		// 清空 input 以便下次選擇
		if (target) {
			target.value = "";
		}
	}
};

const removeFile = (index: number) => {
	selectedFiles.value.splice(index, 1);
	clearError("files");
};

const formatFileSize = (bytes: number): string => {
	if (bytes === 0) return "0 Bytes";
	const k = 1024;
	const sizes = ["Bytes", "KB", "MB", "GB"];
	const i = Math.floor(Math.log(bytes) / Math.log(k));
	return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
};

onUnmounted(() => {
	clearCountdown();
});
</script>

<style scoped>
/* 防止小螢幕水平滾動 */
@media (max-width: 640px) {
	.contact-form {
		/* 確保在小螢幕上不會超出容器寬度 */
		max-width: 100%;
		box-sizing: border-box;
	}

	/* 確保表單內容不會超出 */
	form {
		overflow-x: hidden;
	}

	/* 檔案標籤在小螢幕上的處理 */
	.max-w-24 {
		max-width: 4rem;
	}
}
</style>
