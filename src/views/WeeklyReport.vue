<<template>
  <div class="weekly-page">
    <h1>周总结</h1>

    <div class="stats-grid">
      <div class="stat-card primary">
        <div class="stat-value">{{ statsStore.weeklyTotal }}</div>
        <div class="stat-label">本周完成</div>
      </div>
      <div class="stat-card warning">
        <div class="stat-value">{{ pendingCount }}</div>
        <div class="stat-label">待办剩余</div>
      </div>
      <div class="stat-card success">
        <div class="stat-value">{{ completionRate }}%</div>
        <div class="stat-label">完成率</div>
      </div>
      <div class="stat-card info">
        <div class="stat-value">{{ statsStore.roleDistribution.student }}</div>
        <div class="stat-label">学习完成</div>
      </div>
    </div>

    <div class="section">
      <h3>📅 每日完成情况</h3>
      <div class="daily-bars">
        <div
          v-for="day in statsStore.weeklyData"
          :key="day.fullDate"
          class="day-row"
        >
          <span class="day-name">{{ day.date }}</span>
          <div class="day-track">
            <div
              class="day-fill"
              :style="{ width: Math.min(day.count * 15, 100) + '%' }"
            ></div>
          </div>
          <span class="day-count">{{ day.count }} 个</span>
        </div>
      </div>
    </div>

    <div class="section">
      <h3>⏰ 完成时段分布</h3>
      <div class="time-grid">
        <div class="time-card">
          <div class="time-icon">🌅</div>
          <div class="time-name">上午</div>
          <div class="time-range">09:00 - 12:59</div>
          <div class="time-count">{{ statsStore.hourDistribution.morning }} 个</div>
        </div>
        <div class="time-card">
          <div class="time-icon">☀️</div>
          <div class="time-name">下午</div>
          <div class="time-range">13:00 - 18:59</div>
          <div class="time-count">{{ statsStore.hourDistribution.afternoon }} 个</div>
        </div>
        <div class="time-card">
          <div class="time-icon">🌙</div>
          <div class="time-name">晚上</div>
          <div class="time-range">19:00 - 23:59</div>
          <div class="time-count">{{ statsStore.hourDistribution.evening }} 个</div>
        </div>
        <div class="time-card">
          <div class="time-icon">🌌</div>
          <div class="time-name">凌晨</div>
          <div class="time-range">00:00 - 08:59</div>
          <div class="time-count">{{ statsStore.hourDistribution.night }} 个</div>
        </div>
      </div>
    </div>

    <div class="section">
      <h3>📊 图表可视化</h3>
      <div class="chart-placeholder">
        <div class="placeholder-text">
          ECharts 图表区域<br />
          <small>Day 4 接入柱状图 + 饼图</small>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useTodoStore } from '../stores/todoStore'
import { useStatsStore } from '../stores/statsStore'

const todoStore = useTodoStore()
const statsStore = useStatsStore()

const pendingCount = computed(() =>
  todoStore.todos.filter(t => t.status === 'todo').length
)

const completionRate = computed(() => {
  const total = todoStore.todos.length
  if (total === 0) return 0
  return Math.round((statsStore.weeklyTotal / total) * 100)
})
</script>

<style scoped>
.weekly-page {
  max-width: 700px;
  margin: 0 auto;
  padding: 20px;
}
.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  margin-bottom: 28px;
}
.stat-card {
  padding: 20px;
  border-radius: 12px;
  text-align: center;
  color: white;
}
.stat-card.primary { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); }
.stat-card.warning { background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); }
.stat-card.success { background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); }
.stat-card.info { background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%); }
.stat-value {
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 4px;
}
.stat-label {
  font-size: 14px;
  opacity: 0.9;
}
.section {
  margin-bottom: 28px;
}
.section h3 {
  margin-bottom: 16px;
  color: #303133;
  font-size: 18px;
}
.daily-bars {
  background: white;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 1px 4px rgba(0,0,0,0.04);
}
.day-row {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 0;
  border-bottom: 1px solid #f0f0f0;
}
.day-row:last-child {
  border-bottom: none;
}
.day-name {
  width: 60px;
  font-size: 14px;
  color: #606266;
  font-weight: 500;
}
.day-track {
  flex: 1;
  height: 12px;
  background: #f5f7fa;
  border-radius: 6px;
  overflow: hidden;
}
.day-fill {
  height: 100%;
  background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
  border-radius: 6px;
  transition: width 0.5s ease;
}
.day-count {
  width: 50px;
  text-align: right;
  font-size: 14px;
  color: #909399;
  font-variant-numeric: tabular-nums;
}
.time-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
}
.time-card {
  background: white;
  padding: 16px;
  border-radius: 12px;
  text-align: center;
  box-shadow: 0 1px 4px rgba(0,0,0,0.04);
  transition: 0.2s;
}
.time-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.08);
}
.time-icon {
  font-size: 28px;
  margin-bottom: 8px;
}
.time-name {
  font-weight: 600;
  color: #303133;
  margin-bottom: 4px;
}
.time-range {
  font-size: 12px;
  color: #909399;
  margin-bottom: 8px;
}
.time-count {
  font-size: 20px;
  font-weight: bold;
  color: #409eff;
}
.chart-placeholder {
  height: 300px;
  background: #f5f7fa;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #909399;
  text-align: center;
}
.placeholder-text small {
  display: block;
  margin-top: 8px;
  opacity: 0.7;
}
@media (max-width: 640px) {
  .stats-grid { grid-template-columns: repeat(2, 1fr); }
  .time-grid { grid-template-columns: repeat(2, 1fr); }
}
</style>