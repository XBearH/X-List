<<template>
  <div class="history-page">
    <h1>历史记录</h1>

    <div class="filters">
      <div class="filter-group">
        <label>角色筛选</label>
        <select v-model="roleFilter">
          <option value="all">全部</option>
          <option value="student">学生</option>
          <option value="worker">社畜</option>
        </select>
      </div>
      <div class="filter-group">
        <label>时间范围</label>
        <select v-model="timeFilter">
          <option value="week">本周</option>
          <option value="month">本月</option>
          <option value="all">全部</option>
        </select>
      </div>
      <div class="filter-count">
        共 {{ filteredTodos.length }} 条记录
      </div>
    </div>

    <div v-if="groupedHistory.length === 0" class="empty-state">
      <div class="empty-icon">📜</div>
      <p>暂无历史记录</p>
    </div>

    <div v-else class="timeline">
      <div v-for="group in groupedHistory" :key="group.date" class="date-group">
        <div class="date-header">
          <span class="date-dot"></span>
          <span class="date-text">{{ formatDate(group.date) }}</span>
          <span class="date-count">{{ group.items.length }} 项</span>
        </div>
        <div class="history-list">
          <div
            v-for="todo in group.items"
            :key="todo.id"
            class="history-item"
          >
            <span class="check">✅</span>
            <span class="title">{{ todo.title }}</span>
            <span class="role-badge" :class="todo.role">{{ todo.role }}</span>
            <span class="time">{{ formatTime(todo.completedAt) }}</span>
            <button class="restore-btn" @click="todoStore.toggleTodo(todo.id)">
              恢复
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useTodoStore } from '../stores/todoStore'
import dayjs from 'dayjs'

const todoStore = useTodoStore()
const roleFilter = ref('all')
const timeFilter = ref('week')

const filteredTodos = computed(() => {
  let result = todoStore.completedTodos

  if (roleFilter.value !== 'all') {
    result = result.filter(t => t.role === roleFilter.value)
  }

  if (timeFilter.value === 'week') {
    const weekStart = dayjs().startOf('week')
    result = result.filter(t => dayjs(t.completedAt).isAfter(weekStart.subtract(1, 'second')))
  } else if (timeFilter.value === 'month') {
    const monthStart = dayjs().startOf('month')
    result = result.filter(t => dayjs(t.completedAt).isAfter(monthStart.subtract(1, 'second')))
  }

  return result.sort((a, b) => (b.completedAt || 0) - (a.completedAt || 0))
})

const groupedHistory = computed(() => {
  const groups: Record<string, typeof filteredTodos.value> = {}
  filteredTodos.value.forEach(todo => {
    const date = dayjs(todo.completedAt).format('YYYY-MM-DD')
    if (!groups[date]) groups[date] = []
    groups[date].push(todo)
  })
  return Object.entries(groups)
    .sort(([a], [b]) => b.localeCompare(a))
    .map(([date, items]) => ({ date, items }))
})

const formatDate = (dateStr: string) => {
  const d = dayjs(dateStr)
  const today = dayjs().format('YYYY-MM-DD')
  const yesterday = dayjs().subtract(1, 'day').format('YYYY-MM-DD')
  if (dateStr === today) return '今天'
  if (dateStr === yesterday) return '昨天'
  return d.format('MM月DD日 dddd')
}

const formatTime = (timestamp?: number) => {
  if (!timestamp) return ''
  return dayjs(timestamp).format('HH:mm')
}
</script>

<style scoped>
.history-page {
  max-width: 700px;
  margin: 0 auto;
  padding: 20px;
}
.filters {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 24px;
  padding: 16px;
  background: #f5f7fa;
  border-radius: 12px;
  flex-wrap: wrap;
}
.filter-group {
  display: flex;
  align-items: center;
  gap: 8px;
}
.filter-group label {
  font-size: 14px;
  color: #606266;
  font-weight: 500;
}
.filter-group select {
  padding: 6px 12px;
  border: 1px solid #dcdfe6;
  border-radius: 6px;
  background: white;
  cursor: pointer;
}
.filter-count {
  margin-left: auto;
  font-size: 14px;
  color: #909399;
}
.empty-state {
  text-align: center;
  padding: 60px 20px;
  color: #909399;
}
.empty-icon {
  font-size: 48px;
  margin-bottom: 12px;
}
.timeline {
  position: relative;
}
.timeline::before {
  content: '';
  position: absolute;
  left: 6px;
  top: 8px;
  bottom: 0;
  width: 2px;
  background: #e4e7ed;
}
.date-group {
  margin-bottom: 20px;
  position: relative;
  padding-left: 24px;
}
.date-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 10px;
  font-weight: 600;
  color: #303133;
}
.date-dot {
  position: absolute;
  left: 0;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: #409eff;
  border: 3px solid white;
  box-shadow: 0 0 0 2px #409eff33;
}
.date-count {
  font-size: 12px;
  color: #909399;
  font-weight: normal;
  margin-left: 4px;
}
.history-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.history-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 16px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 1px 4px rgba(0,0,0,0.04);
  transition: 0.2s;
}
.history-item:hover {
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
}
.check {
  font-size: 16px;
}
.title {
  flex: 1;
  color: #303133;
  text-decoration: line-through;
  opacity: 0.7;
}
.role-badge {
  font-size: 11px;
  padding: 2px 8px;
  border-radius: 4px;
  text-transform: uppercase;
}
.role-badge.student {
  background: #e6f7ff;
  color: #1890ff;
}
.role-badge.worker {
  background: #f6ffed;
  color: #52c41a;
}
.time {
  font-size: 13px;
  color: #909399;
  font-variant-numeric: tabular-nums;
}
.restore-btn {
  padding: 4px 10px;
  border: 1px solid #dcdfe6;
  background: white;
  border-radius: 4px;
  font-size: 12px;
  color: #606266;
  cursor: pointer;
  transition: 0.2s;
}
.restore-btn:hover {
  border-color: #409eff;
  color: #409eff;
}
</style>