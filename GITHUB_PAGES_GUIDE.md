# 🚀 GitHub Pages 部署完整指南

## 📋 目錄
- [前置準備](#前置準備)
- [方法一：網頁界面部署（推薦新手）](#方法一網頁界面部署推薦新手)
- [方法二：命令列部署（進階）](#方法二命令列部署進階)
- [自訂域名設置](#自訂域名設置)
- [常見問題解決](#常見問題解決)

---

## 前置準備

### 1. GitHub 帳號
- 前往 [github.com](https://github.com) 註冊免費帳號
- 驗證您的電子郵件地址

### 2. Git 軟體（方法二需要）
- **Windows**: 下載 [Git for Windows](https://git-scm.com/download/windows)
- **macOS**: 安裝 Xcode Command Line Tools：`xcode-select --install`
- **Linux**: `sudo apt install git` 或 `sudo yum install git`

---

## 方法一：網頁界面部署（推薦新手）

### 步驟 1: 創建 GitHub 倉庫

1. **登入 GitHub**
   - 前往 [github.com](https://github.com)
   - 輸入您的用戶名和密碼

2. **創建新倉庫**
   - 點擊右上角的 **"+"** 按鈕
   - 選擇 **"New repository"**

3. **填寫倉庫資訊**
   ```
   Repository name: aqstandards-website
   Description: 絕對質量國際標準官方網站
   ✅ Public (必須選擇，免費用戶限制)
   ✅ Add a README file
   ```

4. **點擊 "Create repository"**

### 步驟 2: 上傳網站文件

1. **準備文件結構**
   ```
   aqstandards-website/
   ├── index.html
   ├── styles/
   │   └── style.css
   ├── scripts/
   │   └── script.js
   ├── README.md
   └── DEPLOYMENT_GUIDE.md
   ```

2. **上傳文件**
   - 在倉庫主頁點擊 **"uploading an existing file"**
   - 將所有網站文件拖拽到上傳區域
   - 或點擊 **"choose your files"** 選擇文件

3. **提交變更**
   ```
   Commit message: 🚀 初始網站發布
   Description (optional): 上傳絕對質量國際標準官網所有文件
   ```
   - 點擊 **"Commit changes"**

### 步驟 3: 啟用 GitHub Pages

1. **前往設置**
   - 在倉庫頁面點擊 **"Settings"** 標籤

2. **找到 Pages 設置**
   - 向下滾動至側邊欄的 **"Pages"** 選項

3. **配置部署來源**
   ```
   Source: Deploy from a branch
   Branch: main
   Folder: / (root)
   ```

4. **保存設置**
   - 點擊 **"Save"** 按鈕

### 步驟 4: 訪問您的網站

- **等待部署** (通常需要 2-10 分鐘)
- **網站網址**: `https://您的用戶名.github.io/aqstandards-website`
- GitHub 會在 Pages 設置頁面顯示網址

---

## 方法二：命令列部署（進階）

### 步驟 1: 本地初始化

```bash
# 進入網站目錄
cd /path/to/your/website

# 初始化 Git 倉庫
git init
git branch -M main

# 添加文件
git add .

# 首次提交
git commit -m "🚀 初始網站發布"
```

### 步驟 2: 連接 GitHub

```bash
# 替換為您的實際 GitHub 用戶名
git remote add origin https://github.com/您的用戶名/aqstandards-website.git

# 推送到 GitHub
git push -u origin main
```

### 步驟 3: 使用自動化腳本

我們提供了兩個自動化腳本：

#### macOS/Linux 用戶
```bash
# 給腳本執行權限
chmod +x deploy-to-github.sh

# 運行部署腳本
./deploy-to-github.sh
```

#### Windows 用戶
```cmd
# 直接運行批次檔
deploy-to-github.bat
```

---

## 自訂域名設置

### 1. 購買域名
- 建議平台：Namecheap、GoDaddy、Cloudflare

### 2. 配置 DNS
在您的域名提供商設置以下記錄：

```
類型    名稱    值
A       @       185.199.108.153
A       @       185.199.109.153
A       @       185.199.110.153
A       @       185.199.111.153
CNAME   www     您的用戶名.github.io
```

### 3. 在 GitHub 設置自訂域名
1. 前往倉庫 Settings → Pages
2. 在 "Custom domain" 輸入您的域名
3. ✅ 勾選 "Enforce HTTPS"

---

## 常見問題解決

### Q1: 網站顯示 404 錯誤
**解決方案**:
- 確認 `index.html` 在倉庫根目錄
- 檢查 Pages 設置中的分支是否正確
- 等待 5-10 分鐘讓部署完成

### Q2: CSS/JS 沒有載入
**解決方案**:
- 檢查文件路徑是否正確
- 確認 `styles/style.css` 和 `scripts/script.js` 存在
- 查看瀏覽器開發者工具的錯誤訊息

### Q3: 外部資源無法載入
**解決方案**:
- GitHub Pages 支援 HTTPS，確保外部資源也使用 HTTPS
- 檢查 Google Fonts、Font Awesome 等連結

### Q4: 更新後網站沒有變化
**解決方案**:
- 清除瀏覽器快取 (Ctrl+F5 或 Cmd+R)
- 等待 GitHub 重新部署（可能需要幾分鐘）
- 檢查 GitHub Actions 頁面是否有部署錯誤

### Q5: 想要更新網站內容
**選項 1 - 網頁界面**:
1. 在 GitHub 倉庫中直接編輯文件
2. 提交變更後自動重新部署

**選項 2 - 本地更新**:
```bash
# 修改文件後
git add .
git commit -m "📝 更新網站內容"
git push
```

---

## 🎯 部署檢查清單

部署前確認：
- [ ] 所有文件都在正確位置
- [ ] `index.html` 在根目錄
- [ ] 圖片和資源路徑正確
- [ ] 外部連結使用 HTTPS
- [ ] 在本地測試過（使用 HTTP 服務器）

部署後確認：
- [ ] 網站可以正常訪問
- [ ] 所有頁面功能正常
- [ ] 在不同設備上測試響應式設計
- [ ] CSS 動畫和 JavaScript 功能正常

---

## 🚀 下一步建議

1. **設置自動部署**: 每次推送代碼自動更新網站
2. **添加 Google Analytics**: 追蹤網站訪問數據
3. **SEO 優化**: 添加 meta 標籤和 sitemap
4. **性能優化**: 壓縮圖片和 CSS/JS 文件

---

**恭喜！您的專業網站現在已經在網路上線了！** 🎉

網站網址: `https://您的用戶名.github.io/aqstandards-website`

如有任何問題，請參考 [GitHub Pages 官方文檔](https://docs.github.com/pages)。