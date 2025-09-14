@echo off
REM 🚀 GitHub Pages 自動部署腳本 (Windows)

echo 🚀 開始部署到 GitHub Pages...

REM 檢查是否已經是 git 倉庫
if not exist ".git" (
    echo 📁 初始化 Git 倉庫...
    git init
    git branch -M main
)

REM 添加所有文件
echo 📦 添加文件到 Git...
git add .

REM 提交變更
echo 💾 提交變更...
for /f "tokens=1-4 delims=/ " %%a in ('date /t') do set mydate=%%c-%%a-%%b
for /f "tokens=1-2 delims=: " %%a in ('time /t') do set mytime=%%a:%%b
set commit_message=🚀 網站更新 %mydate% %mytime%
git commit -m "%commit_message%"

REM 檢查是否已添加遠程倉庫
git remote get-url origin >nul 2>&1
if errorlevel 1 (
    echo ⚠️  請先設置 GitHub 倉庫 URL：
    echo    git remote add origin https://github.com/您的用戶名/aqstandards-website.git
    echo    然後重新運行此腳本
    pause
    exit /b 1
)

REM 推送到 GitHub
echo 🌐 推送到 GitHub...
git push -u origin main

echo ✅ 部署完成！
echo 🌍 您的網站將在幾分鐘後上線：
echo    https://您的用戶名.github.io/aqstandards-website

echo.
echo 📝 如果是第一次部署，請確保：
echo 1. 在 GitHub 倉庫設置中啟用 GitHub Pages
echo 2. 選擇 'main' 分支作為來源

pause