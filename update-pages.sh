#!/bin/bash

# ===========================================
# GitHub Pages 自动更新脚本
# ===========================================
#
# 功能说明：
#   这个脚本用于自动将本地代码更改提交到 GitHub 并更新 GitHub Pages 网站
#
# 使用方法：
#   ./update-pages.sh "你的更新说明"
#
# 示例：
#   ./update-pages.sh "添加了新功能：自动计算折扣"
#   ./update-pages.sh "修复了价格计算的bug"
#
# ===========================================

# 检查是否提供了提交信息参数
if [ $# -eq 0 ]; then
    echo "❌ 错误：请提供更新说明"
    echo "用法: $0 \"更新说明\""
    echo "示例: $0 \"修复了麦子价格\""
    exit 1
fi

# 获取用户输入的提交信息
COMMIT_MESSAGE="$1"

echo "📝 步骤 1: 提交本地更改到本地仓库"
echo "   执行命令: git add ."
git add .

echo "   执行命令: git commit -m \"$COMMIT_MESSAGE\""
git commit -m "$COMMIT_MESSAGE"

echo ""
echo "🚀 步骤 2: 推送更改到远程 main 分支"
echo "   执行命令: git push origin main"
git push origin main

echo ""
echo "🔄 步骤 3: 同步 main 分支到 gh-pages 分支（GitHub Pages 发布源）"
echo "   执行命令: git push origin main:gh-pages --force"
echo "   说明: --force 参数确保覆盖 gh-pages 分支的旧内容"
git push origin main:gh-pages --force

echo ""
echo "✅ 更新完成！"
echo "🌐 网站访问地址: https://h1450512929-ai.github.io/pricing1/"
echo ""
echo "⏳ 注意事项："
echo "   - 请等待 1-2 分钟让 GitHub Pages 重新构建网站"
echo "   - 如果浏览器显示旧内容，请按 Ctrl+F5 强制刷新"
echo "   - 网站地址不会改变，内容会自动更新"
echo ""
echo "📋 工作流程总结："
echo "   本地修改 → 提交到 main → 同步到 gh-pages → GitHub Pages 自动发布"