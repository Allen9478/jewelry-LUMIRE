# jewelry-LUMIÈRE

以 Vue 3 + TypeScript 打造的珠寶藝廊網站，提供作品瀏覽、模糊搜尋、收藏與中英文切換功能，並支援桌機與手機版。

Demo：https://allen9478.github.io/jewelry-LUMIRE/

![Vue](https://img.shields.io/badge/Vue.js-3-4FC08D?style=flat-square&logo=vuedotjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)
![Pinia](https://img.shields.io/badge/Pinia-FFD859?style=flat-square&logo=pinia&logoColor=black)
![Firebase](https://img.shields.io/badge/Firebase-DD2C00?style=flat-square&logo=firebase&logoColor=white)
![ESLint](https://img.shields.io/badge/ESLint-4B32C3?style=flat-square&logo=eslint&logoColor=white)
![Prettier](https://img.shields.io/badge/Prettier-F7B93E?style=flat-square&logo=prettier&logoColor=black)
![Vitest](https://img.shields.io/badge/Vitest-6E9F18?style=flat-square&logo=vitest&logoColor=white)
[![CI](https://github.com/Allen9478/jewelry-LUMIRE/actions/workflows/deploy.yml/badge.svg?branch=main)](https://github.com/Allen9478/jewelry-LUMIRE/actions/workflows/deploy.yml)

## 畫面預覽

<img src="./docs/screenshots/home.png" width="800" alt="首頁" />

<img src="./docs/screenshots/search.gif" width="800" alt="搜尋功能" />

<img src="./docs/screenshots/mobile.png" width="300" alt="手機版" />

## 功能特色

- 🔍 **模糊搜尋**：以 Fuse.js 實作，支援搜尋珠寶或藝術家名稱，點擊結果或按 Enter 即可跳轉並關閉視窗
- ❤️ **收藏功能**：登入後可收藏喜歡的作品，會員與收藏資料由 Firebase 管理
- 🌐 **多語系切換**：以 vue-i18n 實作，支援全站中英文切換
- 💡 **光線跟隨互動效果**：自訂 composable `useLightFollow`，在 About 頁面中滑鼠移動時產生光澤效果
- 📱 **響應式設計**：以 Tailwind CSS 實作，桌機與手機版各有對應版面，手機版提供漢堡選單

## 使用技術

Vue 3、TypeScript、Vite、Tailwind CSS、Vue Router、Pinia、Firebase、Fuse.js、vue-i18n、Vitest、ESLint、Prettier、GitHub Actions

## 技術重點

- **Pinia 狀態職責拆分**：auth、favorite、ui 各管各的，favorite 單向依賴 auth，避免循環依賴
- **收藏的樂觀更新**：先更新畫面再寫入 Firestore，失敗時回滾；回滾前先確認狀態，避免蓋掉使用者後來的操作
- **非同步競態處理**：載入收藏期間切換帳號時，丟棄前一個帳號遲到的結果
- **離線防護**：離線時 Firestore 寫入只會排隊而不會失敗，所以先擋下並提示，避免畫面顯示已收藏但資料未寫入
- **雙語模糊搜尋**：Fuse.js 同時比對中英文名稱與設計師，作品與藝術家合併排序
- **從 JavaScript 逐步遷移至 TypeScript**，並開啟嚴格的型別檢查選項
- **CI/CD**：PR 執行型別檢查、ESLint 與測試，通過後合併到 main 才建置並部署

## 遇到的問題與解決

- 狀態邏輯分散在各頁面，沒有統一管理，導致單頁程式碼過長 → 建立 composables 管理 Pinia 狀態邏輯
- JS 遷移 TS 後，陣列資料取值出現型別錯誤 → 在 composables 中用 TypeScript 泛型自訂 `txItems` 函式去轉換資料
- 登入狀態下重新整理頁面後，帳號狀態消失 → 使用 Firebase 的 `onAuthStateChanged` 監聽以確保頁面重整後仍與 Firebase 同步
- 早期直接在 main 修改，變更紀錄混雜 → 以功能分支搭配 PR 合併，透過 GitHub Actions 自動部署
- 未登入時點擊卡片愛心，登入後沒有導回原本瀏覽之頁面 → 登入視窗在沒有指定導向時改以目前打開視窗的頁面作為導向目標，並在關閉視窗後清除

## 測試

使用 [Vitest](https://vitest.dev/) 撰寫單元測試，涵蓋工具函式與 Pinia store 的核心邏輯。Firebase 以 `vi.mock` 隔離，測試不需要連線，也不需要任何環境變數。

| 測試對象           | 驗證內容                                                                                                 |
| ------------------ | -------------------------------------------------------------------------------------------------------- |
| `authError`        | Firebase 錯誤代碼對應 i18n key；未知錯誤與非 Firebase 錯誤會回傳備援訊息                                 |
| `useUiStore`       | 關閉登入視窗時清除導向目標；提示訊息自動消失，連續觸發時不會被舊計時器提前關閉（以假計時器驗證）         |
| `useFavoriteStore` | 未登入時攔截並開啟登入視窗；加入收藏的樂觀更新與寫入路徑、資料；寫入失敗時回滾並提示；載入收藏成功與失敗 |

**如何確認測試有效**：除了確認通過，我也刻意破壞程式碼（例如移除回滾邏輯、寫錯 Firestore 路徑），確認對應的測試會失敗，避免寫出「怎麼改都會通過」的測試。

**CI**：Pull Request 會執行型別檢查、ESLint 與測試；合併到 main 後，檢查通過才會建置並部署到 GitHub Pages。

```bash
npm test             # 監聽模式，存檔自動重跑
npm test -- --run    # 只執行一次
```

## 展示用

以下為展示用途，尚未寫成實際功能：

- 聯絡表單：已實作前端驗證（必填、Email 格式），送出後僅顯示提示，不會傳送任何資料。
- 電子報：已實作 Email 格式驗證，送出後僅顯示展示提示，不會實際訂閱。
- Footer 項目：僅呈現版面，未連結至頁面。

## 本地執行

需要 Node.js `^20.19.0` 或 `>=22.12.0`。

```bash
git clone https://github.com/Allen9478/jewelry-LUMIRE.git
cd jewelry-LUMIRE
npm install
```

### Firebase 設定

本專案使用 Firebase，需先在 [Firebase Console](https://console.firebase.google.com/) 建立自己的專案，並啟用 Authentication 與 Firestore。

複製範例檔，並填入自己的 Firebase 設定：

```bash
cp .env.example .env.local
```

`.env.local` 需要的變數：

```env
VITE_API_KEY=
VITE_AUTH_DOMAIN=
VITE_PROJECT_ID=
VITE_STORAGE_BUCKET=
VITE_MESSAGING_SENDER_ID=
VITE_APP_ID=
```

### 資料結構與安全規則

收藏功能使用 Firestore,資料結構如下:

```
favorites/{uid}/items/{workId}
  ├─ workId: string
  └─ addedAt: timestamp
```

安全規則寫在 [`firestore.rules`](./firestore.rules),重點如下:

- 只有已登入且 `uid` 與路徑相符的使用者,才能讀寫自己的收藏
- 無法讀取或修改其他使用者的資料

### 常用指令

| 指令              | 說明               |
| ----------------- | ------------------ |
| `npm run dev`     | 啟動開發伺服器     |
| `npm test`        | 執行測試(監聽模式) |
| `npm run check`   | 型別檢查與 ESLint  |
| `npm run build`   | 型別檢查並建置     |
| `npm run preview` | 預覽建置結果       |

## 作者

Allen · [GitHub](https://github.com/Allen9478) · Email：allenyu0708@gmail.com
