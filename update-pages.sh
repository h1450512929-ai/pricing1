#!/bin/bash

# 自动更新 GitHub Pages 脚本
# 用法: ./update-pages.sh "更新说明"

if [ $# -eq 0 ]; then
    echo "请提供更新说明，例如: ./update-pages.sh '修复了某某功能'"
    exit 1
fi

COMMIT_MESSAGE="$1"

echo "📝 提交本地更改..."
git add .
git commit -m "$COMMIT_MESSAGE"

echo "🚀 推送 main 分支..."
git push origin main

echo "🔄 同步到 gh-pages 分支..."
git push origin main:gh-pages --force

echo "✅ 更新完成！"
echo "访问地址: https://h1450512929-ai.github.io/pricing1/"
echo "请等待 1-2 分钟让 GitHub Pages 重新构建。"