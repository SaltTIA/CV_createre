## 概述

單頁英文履歷編輯器，面向個人求職者，部署於 GitHub Pages。核心體驗：表單填空即時渲染預覽，支援自動排版與多模板切換，附帶可選的引導式問卷降低使用門檻。

## 使用場景

- 個人求職者為自己打造一份單頁 A4 英文 CV
- 朋友、同學各自在瀏覽器打開同一部署站點，獨立編輯與匯出（無登入、無後端、資料僅存 localStorage）

## 技術棧

- React 18 + TypeScript + Vite
- Tailwind CSS
- React Context + useReducer（狀態管理）
- html2pdf.js（PDF 匯出）
- React Router（HashRouter，GitHub Pages 兼容）
- localStorage（資料持久化）

## 架構

單頁應用，左右雙欄：

- **左欄：編輯區**（繁體中文 UI）
  - 頂部區塊導航 tabs：基本資料、簡介、經歷、學歷、技能、語言、證照、作品集（選填）
  - 點選切換對應表單模組，每個區塊一個獨立 Form 組件
  - 經歷、學歷、技能、語言、證照、作品集支援動態增刪多筆

- **右欄：即時預覽**
  - 模擬 A4 紙張渲染（210mm×297mm），表單內容即時同步顯示為英文 CV
  - 模板切換器：五套視覺風格的視覺化卡片選擇器
  - 自動排版開關：預設開啟，程式按內容權重動態分配垂直空間與字級；使用者可關閉並手動拖曳區塊分隔線
  - 匯出 PDF 按鈕，匯出前做單頁溢出提示

## 資料模型

所有區塊置於一棵 CV 物件樹中，由單一 reducer 管理：

- personal: fullName, email, phone, location, linkedIn?, portfolio?
- summary: string
- experiences: {company, title, startDate, endDate?, current, description}[]
- education: {school, degree, field, startDate, endDate?}[]
- skills: {category, items}[]
- languages: {language, proficiency: Native | Fluent | Advanced | Intermediate | Basic}[]
- certifications: {name, issuer, date}[]
- projects?: {name, url?, description}[]

## 組件樹

```
App
├── OnboardingWizard (啟動畫面：問卷 或 跳過)
└── CVProvider (Context + useReducer)
    └── EditorLayout
        ├── SectionNav (左側區塊導航)
        ├── FormPanel
        │   ├── PersonalForm
        │   ├── SummaryForm
        │   ├── ExperienceForm
        │   ├── EducationForm
        │   ├── SkillsForm
        │   ├── LanguagesForm
        │   ├── CertificationsForm
        │   └── ProjectsForm
        └── PreviewPanel
            ├── TemplateSelector
            ├── AutoLayoutToggle
            ├── CVPreview (A4 容器)
            │   └── 各 PreviewSection 組件
            └── ExportButton
```

## 引導問卷（Onboarding Wizard）

首次啟動時顯示。兩個入口：「快速開始（問卷引導）」和「跳過，手動編輯」。跳過則直接進入編輯器並載入範例假資料。完成問卷後自動填入資料並套用選定模板。

問卷步驟（逐步單頁，可返回修改）：

1. 基本資料（姓名、Email、電話、地點、LinkedIn 選填）
2. 個人簡介
3. 工作經歷（可逐筆新增）
4. 學歷（可逐筆新增）
5. 技能（自由文字輸入）
6. 語言能力
7. 證照（可跳過）
8. 風格選擇（五張模板縮圖卡片，點選預覽，選定後進入編輯器）

## 模板

五套 A4 英文履歷模板，共用同一組 PreviewSection 組件，差異僅在 CSS：

1. 傳統簡潔：左側資訊欄 + 右側主內容
2. 現代緊湊：全寬單欄，線條分隔區塊
3. 極簡黑白：無裝飾線，純字重與間距做層次
4. 側邊色塊：左側深色底放基本資料，右側淺色放內容
5. 雙欄緊湊：上方橫幅基本資料，下方左右雙欄排經歷與學歷

## 自動排版引擎

預設啟用。邏輯：

- 計算各區塊內容的實際佔用高度
- 按預設權重（摘要 8%、經歷 30%、學歷 15% 等）動態分配垂直空間
- 微調字級（±1-2pt）與行距使頁面均勻填滿
- 使用者可關閉自動排版，改為手動拖曳區塊分隔線自行分配

## 驗證

- 即時欄位級：Email 格式、必填欄位提示
- 匯出前整體級：必要區塊不可全部空白，單頁溢出警告

## 儲存與部署

- 履歷資料：localStorage key `cv-data`，每次 dispatch 自動寫入
- 問卷完成標記：localStorage key `cv-onboarded`，已完成的用戶下次跳過問卷
- 「清除資料重新開始」按鈕（含確認對話框）
- 部署：Vite build → `dist/` → GitHub Pages（gh-pages 分支）
- 路由使用 HashRouter 確保 GitHub Pages 刷新不 404
