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

Vue 3、TypeScript、Vite、Tailwind CSS、Vue Router、Pinia、Firebase、Fuse.js、vue-i18n、ESLint、Prettier

## 技術重點

- Pinia 狀態職責拆分
- 從 JavaScript 逐步遷移至 TypeScript
- 使用 Fuse.js 實作模糊搜尋
- 使用 vue-i18n 實作中英文切換

## 遇到的問題與解決

- 狀態邏輯分散在各頁面，沒有統一管理，導致單頁程式碼過長 → 建立 composables 管理 Pinia 狀態邏輯
- JS 遷移 TS 後，陣列資料取值出現型別錯誤 → 在 composables 中用 TypeScript 泛型自訂 `txItems` 函式去轉換資料
- 登入狀態下重新整理頁面後，帳號狀態消失 → 使用 Firebase 的 `onAuthStateChanged` 監聽以確保頁面重整後仍與 Firebase 同步
- 早期直接在 main 修改，變更紀錄混雜 → 以功能分支搭配 PR 合併，透過 GitHub Actions 自動部署
- 未登入時點擊卡片愛心，登入後沒有導回原本瀏覽之頁面 → 登入視窗在沒有指定導向時改以目前打開視窗的頁面作為導向目標，並在關閉視窗後清除

## 本地執行

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

### 啟動

```bash
npm run dev
```

## 作者

Allen · [GitHub](https://github.com/Allen9478) · Email：allenyu0708@gmail.com
