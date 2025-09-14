#!/bin/bash

# 🚀 GitHub Pages 自動部署腳本
# 適用於 macOS 和 Linux

echo "🚀 開始部署到 GitHub Pages..."

# 檢查是否已經是 git 倉庫
if [ ! -d ".git" ]; then
    echo "📁 初始化 Git 倉庫..."
    git init
    git branch -M main
fi

# 添加所有文件
echo "📦 添加文件到 Git..."
git add .

# 提交變更
echo "💾 提交變更..."
commit_message="🚀 網站更新 $(date '+%Y-%m-%d %H:%M:%S')"
git commit -m "$commit_message"

# 檢查是否已添加遠程倉庫
if ! git remote get-url origin > /dev/null 2>&1; then
    echo "⚠️  請先設置 GitHub 倉庫 URL："
    echo "   git remote add origin https://github.com/您的用戶名/aqstandards-website.git"
    echo "   然後重新運行此腳本"
    exit 1
fi

# 推送到 GitHub
echo "🌐 推送到 GitHub..."
git push -u origin main

echo "✅ 部署完成！"
echo "🌍 您的網站將在幾分鐘後上線："
echo "   https://您的用戶名.github.io/aqstandards-website"

echo ""
echo "📝 如果是第一次部署，請確保："
echo "1. 在 GitHub 倉庫設置中啟用 GitHub Pages"
echo "2. 選擇 'main' 分支作為來源"