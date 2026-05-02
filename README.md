# 农资销售计价软件

一个基于网页的农资销售计价系统，支持实时计算、数据筛选和导出功能。

## 🌐 在线访问

访问地址：https://h1450512929-ai.github.io/pricing1/

## 🚀 快速开始

### 本地开发

1. 克隆项目
```bash
git clone https://github.com/h1450512929-ai/pricing1.git
cd pricing1
```

2. 启动本地服务器
```bash
npm run start
# 或
python3 -m http.server 8000
```

3. 打开浏览器访问 `http://localhost:8000`

### 更新方式

#### 手动更新

修改代码后，使用以下命令进行手动更新：

```bash
./update-pages.sh "更新说明"
```

示例：

```bash
./update-pages.sh "修复了价格计算功能"
```

> 这个脚本会自动将修改提交到本地仓库，并推送到 `main` 和 `gh-pages` 分支，随后 GitHub Pages 会重新构建站点。

## 📋 功能特性

- ✅ 实时价格计算
- ✅ 数据筛选和搜索
- ✅ 分页显示
- ✅ Excel 导出
- ✅ 本地数据存储
- ✅ 响应式设计

## 🛠️ 技术栈

- HTML5 + CSS3 + JavaScript
- LocalStorage (数据存储)
- GitHub Pages (静态部署)

## 📝 更新日志

- v1.0.0 - 初始版本发布
- 自动更新功能 - 支持文件监听和自动部署

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📄 许可证

MIT License