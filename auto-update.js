#!/usr/bin/env node

// ===========================================
// GitHub Pages 自动监听更新脚本
// ===========================================
//
// 功能：监听文件变化，自动更新 GitHub Pages
// 启动方法：node auto-update.js
// 停止方法：Ctrl+C
//
// ===========================================

const fs = require('fs');
const { exec } = require('child_process');
const path = require('path');

// 监听的文件类型
const watchExtensions = ['.html', '.css', '.js', '.json', '.md'];

// 忽略的文件和目录
const ignorePaths = [
    'node_modules',
    '.git',
    '.vscode',
    'dist',
    'build'
];

// 防抖延迟（毫秒）- 避免频繁触发
const debounceDelay = 1000;
let updateTimeout = null;

// 检查文件是否需要监听
function shouldWatchFile(filePath) {
    const ext = path.extname(filePath);
    const relativePath = path.relative(process.cwd(), filePath);

    // 检查扩展名
    if (!watchExtensions.includes(ext)) {
        return false;
    }

    // 检查是否在忽略列表中
    for (const ignorePath of ignorePaths) {
        if (relativePath.startsWith(ignorePath)) {
            return false;
        }
    }

    return true;
}

// 执行更新脚本
function runUpdateScript(filePath) {
    const fileName = path.basename(filePath);
    const commitMessage = `自动更新 - 修改了 ${fileName}`;

    console.log(`\n🔄 检测到文件变化: ${fileName}`);
    console.log(`📝 准备提交更新...`);

    // 执行更新脚本
    exec(`./update-pages.sh "${commitMessage}"`, (error, stdout, stderr) => {
        if (error) {
            console.error(`❌ 更新失败: ${error.message}`);
            return;
        }

        if (stderr) {
            console.error(`⚠️ 警告: ${stderr}`);
        }

        console.log(`✅ 更新成功!`);
        console.log(`🌐 网站地址: https://h1450512929-ai.github.io/pricing1/`);
        console.log(`⏳ 等待 GitHub Pages 重新构建中...\n`);
    });
}

// 防抖处理文件变化
function handleFileChange(eventType, filePath) {
    if (!shouldWatchFile(filePath)) {
        return;
    }

    // 清除之前的定时器
    if (updateTimeout) {
        clearTimeout(updateTimeout);
    }

    // 设置新的定时器
    updateTimeout = setTimeout(() => {
        runUpdateScript(filePath);
    }, debounceDelay);
}

// 开始监听
function startWatching() {
    console.log('🚀 GitHub Pages 自动更新监听器已启动');
    console.log('📁 监听目录:', process.cwd());
    console.log('📄 监听文件类型:', watchExtensions.join(', '));
    console.log('⏸️  按 Ctrl+C 停止监听\n');

    // 使用 fs.watch 监听文件变化
    fs.watch('.', { recursive: true }, handleFileChange);

    // 每30秒显示一次状态
    setInterval(() => {
        console.log(`⏳ 监听中... (${new Date().toLocaleTimeString()})`);
    }, 30000);
}

// 检查是否在正确的目录
if (!fs.existsSync('update-pages.sh')) {
    console.error('❌ 错误: 找不到 update-pages.sh 脚本');
    console.error('请确保在项目根目录运行此脚本');
    process.exit(1);
}

// 检查 Node.js 版本
if (parseInt(process.version.split('.')[0].slice(1)) < 14) {
    console.error('❌ 错误: 需要 Node.js 14 或更高版本');
    process.exit(1);
}

startWatching();