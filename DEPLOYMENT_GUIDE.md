# 🚀 網站部署指南

## 本地預覽方法

### 方法一：Python HTTP Server（推薦）
```bash
# 在網站資料夾中執行
python -m http.server 8000
# 然後訪問：http://localhost:8000
```

### 方法二：Node.js HTTP Server
```bash
npx http-server
# 或者全局安裝：npm install -g http-server
```

### 方法三：VS Code Live Server
1. 安裝 "Live Server" 擴展
2. 右鍵 index.html → "Open with Live Server"

## 線上部署方法

### GitHub Pages（免費）
1. 創建GitHub倉庫
2. 上傳所有文件
3. 在設置中啟用GitHub Pages
4. 選擇main分支為來源

### Netlify（免費）
1. 前往 netlify.com
2. 拖拽整個網站資料夾到部署區域
3. 自動獲得線上網址

### Vercel（免費）
1. 前往 vercel.com
2. 連接GitHub倉庫或直接上傳
3. 自動部署並獲得域名

## 重要提醒

⚠️ **絕對不要**直接在瀏覽器中打開HTML文件
✅ **一定要**使用HTTP服務器來預覽網站

這樣才能正確載入所有的CSS樣式、JavaScript功能和外部資源。

## 問題排解

### 如果仍然顯示純文字：
1. 檢查是否使用了HTTP服務器（網址應該是http://localhost:xxxx）
2. 檢查瀏覽器控制台是否有錯誤訊息
3. 確認網絡連線正常（外部資源需要網絡）
4. 嘗試清除瀏覽器快取

### 如果動畫沒有顯示：
1. 檢查JavaScript控制台錯誤
2. 確認AOS庫正確載入
3. 嘗試重新整理頁面

---

**現在您可以享受完整的現代化網站體驗了！** 🎉✨
