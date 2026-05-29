<<template>
  <div class="history-page">
    <h1>历史记录</h1>
    <div v-if="todoStore.completedTodos.length === 0" class="empty">还没有完成的任务哦</div>
    <div v-else class="history-list">
      <div v-for="todo in todoStore.completedTodos" :key="todo.id" class="history-item">
        <span>✅ {{ todo.title }}</span>
        <span class="time">{{ formatTime(todo.completedAt) }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useTodoStore } from '../stores/todoStore'
import dayjs from 'dayjs'

const todoStore = useTodoStore()

const formatTime = (timestamp?: number) => {
  if (!timestamp) return ''
  return dayjs(timestamp).format('MM-DD HH:mm')
}
</script>

<style scoped>
.history-page { max-width: 600px; margin: 0 auto; padding: 20px; }
.history-item { display: flex; justify-content: space-between; padding: 12px; background: #f0f9ff; margin-bottom: 8px; border-radius: 8px; }
.time { color: #666; font-size: 14px; }
.empty { text-align: center; color: #999; padding: 40px; }
</style>