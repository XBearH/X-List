<<template>
  <div class="weekly-page">
    <h1>周总结</h1>
    <p>本周完成任务数：<strong>{{ todoStore.completedTodos.length }}</strong></p>
    <div class="chart-placeholder">📊 图表区域（Day 5 接入 ECharts）</div>
  </div>
</template>

<script setup lang="ts">
import { useTodoStore } from '../stores/todoStore'
const todoStore = useTodoStore()
</script>

<style scoped>
.weekly-page { max-width: 600px; margin: 0 auto; padding: 20px; }
.chart-placeholder { height: 300px; background: #f5f5f5; border-radius: 12px; display: flex; align-items: center; justify-content: center; color: #999; margin-top: 20px; }
</style>