# X-TodoList

基于 Vue3 + TypeScript + Vite 的角色化任务管理系统，支持学生/社畜双模式，集成周总结数据可视化与历史记录回溯。

## 技术栈
- Vue 3 (Composition API)
- TypeScript
- Vite
- Pinia
- Vue Router 4
- Element Plus / Dayjs / ECharts

## 功能亮点

### 双角色场景设计
- **学生模式**：考试倒计时卡片 + 学习任务管理
- **社畜模式**：快速标签栏（日报/周会/Review）+ 工作任务管理
- 角色数据完全隔离，切换上下文自动变更

### 数据可视化
- ECharts 柱状图：本周每日完成趋势
- ECharts 环形图：任务完成时段分布（上午/下午/晚上/凌晨）
- ECharts 饼图：学习 vs 工作占比

### 工程化实践
- Pinia + localStorage 数据持久化，刷新不丢失
- 遵循 Conventional Commits 规范，Git 历史清晰可追溯
- 响应式布局，支持移动端访问

## 项目结构

```text
src/
├── components/
│   ├── common/         # 通用组件（EmptyState）
│   ├── student/        # 学生专属（ExamCountdown）
│   ├── worker/         # 社畜专属（QuickTags）
│   └── stats/          # 统计图表（ECharts）
├── views/
│   ├── Today.vue       # 今日待办（双角色）
│   ├── History.vue     # 历史记录（筛选+恢复）
│   ├── WeeklyReport.vue# 周总结（数据统计+可视化）
│   └── Settings.vue    # 设置（考试管理）
├── stores/
│   ├── todoStore.ts    # Todo 状态 + 持久化
│   ├── userStore.ts    # 用户角色 + 考试数据
│   └── statsStore.ts   # 周统计数据计算
├── composables/        # 组合式逻辑复用
├── utils/
│   └── storage.ts      # localStorage 封装
└── router/
    └── index.ts        # 路由配置  └── index.ts        # 路由配置


## 本地运行
```bash
npm install
npm run dev
