# 🗣️ AI 英語發音教練 (AI English Pronunciation Coach)

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Gemini API](https://img.shields.io/badge/AI-Gemini%201.5%20Flash-blue)](https://ai.google.dev/)
[![Web Speech API](https://img.shields.io/badge/Web%20API-Speech%20Recognition-green)](#)

這是一個基於 **Vibe Coding** 精神打造的超輕量級「AI 英語發音教練」網頁應用程式。完全不需要架設傳統後端伺服器 (Serverless)，只需瀏覽器與 Google 帳號即可運行！

專案結合了 **Google Gemini API** 的強大生成能力與瀏覽器原生的 **Web Speech API**，能夠根據使用者選擇的情境，動態生成由淺入深的英語對話，並即時評分你的發音準確度。

## ✨ 核心特色

* **🚀 零伺服器架構 (Serverless)**：前端純 HTML/JS/CSS 打造，後端依賴 Google Apps Script (GAS) 作為中介層，無需煩惱伺服器維護與架站。
* **🧠 動態情境出題**：串接 Gemini 1.5 Flash 模型，涵蓋「日本旅遊、餐廳點餐、職場會議」等 10 大情境，每次測驗都是即時生成的 5 題漸進式挑戰。
* **🎙️ 即時發音評測**：使用瀏覽器內建的 `SpeechRecognition`，自動比對單字發音。
* **📊 視覺化回饋與計分**：精準標示「唸對」與「唸錯」的單字（字級 Diff 比對），並配備防作弊計分系統（0~100分）。
* **🔊 內建標準語音**：支援 `speechSynthesis` 示範標準美式發音。

## 🏗️ 系統架構

1. **前端 (Frontend)**：Vanilla JavaScript + HTML。負責介面渲染、語音辨識 (ASR) 與語音合成 (TTS)。
2. **中介層 (Middleware)**：Google Apps Script (GAS)。負責隱藏並保護 Gemini API Key，接收前端請求，格式化 Prompt 並與 Gemini 溝通，確保回傳穩定的 JSON 陣列。
3. **AI 模型 (LLM)**：Gemini 1.5 Flash。負責依據情境與難度（Level 1-5）即時生成英文句子與中文翻譯。

---

## 🛠️ 快速安裝與部署指南

要讓這個專案在你的環境跑起來，你只需要完成以下兩個步驟：

### 步驟一：部署後端 (Google Apps Script)

1. 前往 [Google Apps Script](https://script.google.com/) 新增一個專案。
2. 將本專案目錄下的 `backend/Code.gs`（請自行將 GAS 程式碼存入此檔名）內容貼上。
3. 取得你的 [Gemini API Key](https://aistudio.google.com/app/apikey)，並取代程式碼首行的 `YOUR_GEMINI_API_KEY`。
4. 點擊右上角 **部署 (Deploy) > 新增部署作業 (New Deployment)**：
   * 類型選擇：**網頁應用程式 (Web App)**
   * 執行身分：**我 (Me)**
   * 誰有權限存取：**所有人 (Anyone)** ⚠️ *這點非常重要，否則前端會發生 CORS 錯誤！*
5. 部署完成後，複製產生的 **網頁應用程式 URL**。

### 步驟二：設定前端

1. Clone 此專案到本地端：
   ```bash
   git clone [https://github.com/yourusername/ai-pronunciation-coach.git](https://github.com/yourusername/ai-pronunciation-coach.git)
