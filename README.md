# X-TodoList

基于 Vue3 + TypeScript + Vite 的角色化任务管理系统，支持学生/社畜双模式，集成周总结数据可视化。

## 技术栈
- Vue 3 (Composition API)
- TypeScript
- Vite
- Pinia
- Vue Router 4
- Element Plus / Dayjs / ECharts

## 功能模块

### 已完成
- [x] 项目脚手架与工程化配置（Vite + TS + ESLint）
- [x] 基础路由与导航布局（4 页面结构）
- [x] Pinia 状态管理
- [x] **localStorage 数据持久化**（刷新不丢失）
- [x] Todo 增删改查与状态切换
- [x] **学生/社畜双角色切换**与数据隔离
- [x] **学生模式**：考试倒计时卡片 + 考试管理（设置页增删）
- [x] **社畜模式**：快速标签栏（一键添加常用工作项）
- [x] 历史记录页面（已完成任务时间轴）

### 开发中
- [ ] 周总结数据统计（ECharts 可视化）
- [ ] 任务优先级与标签筛选
- [ ] 响应式布局优化

## 本地运行
```bash
npm install
npm run dev
