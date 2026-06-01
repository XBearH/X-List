# X-TodoList

基于 Vue3 + TypeScript + Vite 的角色化任务管理系统，支持学生/社畜双模式，集成周总结数据可视化与历史记录回溯。

## 技术栈
- Vue 3 (Composition API)
- TypeScript
- Vite
- Pinia
- Vue Router 4
- Element Plus / Dayjs / ECharts

## 功能模块

### 已完成
- [x] 项目脚手架与工程化配置（Vite + TS）
- [x] 基础路由与导航布局（4 页面结构）
- [x] Pinia 状态管理 + localStorage 数据持久化（刷新不丢失）
- [x] Todo 增删改查与状态切换
- [x] **学生/社畜双角色切换**与数据隔离
- [x] **学生模式**：考试倒计时卡片 + 考试管理（设置页增删）
- [x] **社畜模式**：快速标签栏（一键添加常用工作项）
- [x] **历史记录**：按日期分组时间轴、角色/时间范围筛选、一键恢复
- [x] **周总结**：本周完成统计、每日进度条、完成时段分布
- [x] **数据可视化**：ECharts 柱状图（周趋势）+ 环形图（时段）+ 饼图（角色占比）

### 开发中
- [ ] 任务优先级与标签筛选
- [ ] 响应式布局全面适配
- [ ] 项目截图与 GIF 演示

## 项目结构

```text
src/
├── components/
│   ├── common/         # 通用组件
│   ├── student/        # 学生专属（考试倒计时）
│   ├── worker/         # 社畜专属（快速标签）
│   └── stats/          # 统计图表（Day 4 接入）
├── views/
│   ├── Today.vue       # 今日待办（双角色）
│   ├── History.vue     # 历史记录（筛选+恢复）
│   ├── WeeklyReport.vue# 周总结（数据统计）
│   └── Settings.vue    # 设置（考试管理）
├── stores/
│   ├── todoStore.ts    # Todo 状态 + 持久化
│   ├── userStore.ts    # 用户角色 + 考试数据
│   └── statsStore.ts   # 周统计数据计算
├── composables/        # 组合式逻辑复用
├── utils/
│   └── storage.ts      # localStorage 封装
└── router/
    └── index.ts        # 路由配置


## 本地运行
```bash
npm install
npm run dev
