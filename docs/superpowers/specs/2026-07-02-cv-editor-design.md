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
  - 頂部區塊導航 tabs：基本資料、簡介、經歷、學歷、技能、語言、證照、作品集（選填）、自訂區塊、求職信
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
- customSections: {title: string, items: {heading: string, detail: string}[]}[]
使用者可在編輯器中新增任意數量的自訂區塊。每個自訂區塊包含一個自訂標題（如 "Awards"、"Volunteer Experience"）和多筆條目，每筆條目有 heading（標題行）和 detail（說明行）。自訂區塊在預覽中的排版與預設區塊一致，自動排版引擎同樣涵蓋自訂區塊。

## 外部 CV 匯入

- 支援 PDF 與 DOCX 匯入，提取純文字後透過純規則引擎做結構識別
- 識別策略：偵測常見 CV 區塊標題關鍵詞（Experience、Education、Skills 等），將後續文字關聯到對應欄位
- 準確度約七成，雙欄佈局、表格排版、創意設計型 CV 可能解析失準
- 定位為半自動輔助：解析結果填入對應表單後，使用者逐區確認修正
- 依賴：pdf.js（PDF 文字提取）、mammoth.js（DOCX 文字提取）

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
        │   ├── ProjectsForm
        │   └── CoverLetterForm
        └── PreviewPanel
            ├── TemplateSelector
            ├── AutoLayoutToggle
            ├── CVPreview (A4 容器)
            │   └── 各 PreviewSection 組件
            ├── ImportButton (PDF/DOCX 匯入)
            └── ExportButton
```

## 引導問卷（Onboarding Wizard）

首次啟動時顯示。三個入口：「快速開始（問卷引導）」「跳過，手動編輯」「撰寫求職信」。跳過則直接進入編輯器並載入範例假資料。完成問卷後自動填入資料並套用選定模板。

「撰寫求職信」入口直接進入求職信編輯器，若尚無 CV 個人資料則先填入基本姓名與聯絡方式再進入信體編輯，免走完整 CV 流程。

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

## 求職信編輯器

CV 編輯器的輕量延伸，作為左側導航的最後一個 tab。功能：

- 自動帶入 CV 個人資料作為信頭（姓名、Email、電話、LinkedIn）
- 三段式模板引導：開頭 / 正文 / 結尾框架，四種語氣可選（專業正式、熱情積極、簡潔直接、學術研究）
- 使用者只需填寫公司名、職位名與自訂段落
- 視覺預設沿用 CV 選定的模板風格，也可獨立切換
- A4 預覽與獨立匯出 PDF
- 合併匯出：一個按鈕將 CV + 求職信打包為一份兩頁 PDF
- 資料存入同一套 localStorage，key `cv-cover-letter`

匯出 CV 完成後顯示提示對話框，詢問使用者是否需要撰寫求職信，可選擇「開始撰寫」或「不用了，直接下載」。

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
- 求職信資料：localStorage key `cv-cover-letter`
- 問卷完成標記：localStorage key `cv-onboarded`，已完成的用戶下次跳過問卷
- 「清除資料重新開始」按鈕（含確認對話框）
- 部署：Vite build → `dist/` → GitHub Pages（gh-pages 分支）
- 路由使用 HashRouter 確保 GitHub Pages 刷新不 404