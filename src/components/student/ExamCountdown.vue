<template>
  <div class="exam-countdown" v-if="exam">
    <div class="exam-info">
      <span class="label">距离</span>
      <span class="name">{{ exam.name }}</span>
      <span class="label">还有</span>
      <span class="days">{{ days }}</span>
      <span class="label">天</span>
    </div>
    <div class="date">考试日期：{{ exam.date }}</div>
  </div>
  <div class="exam-empty" v-else>
    📚 暂无考试倒计时，去设置页面添加吧
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import dayjs from 'dayjs'
import { useUserStore } from '../../stores/userStore'

const userStore = useUserStore()
const exam = computed(() => userStore.nearestExam)

const days = computed(() => {
  if (!exam.value) return 0
  const diff = dayjs(exam.value.date).diff(dayjs(), 'day')
  return diff >= 0 ? diff : 0
})
</script>

<style scoped>
.exam-countdown {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 20px;
  border-radius: 12px;
  margin-bottom: 20px;
}
.exam-info {
  display: flex;
  align-items: baseline;
  gap: 8px;
  flex-wrap: wrap;
}
.days {
  font-size: 36px;
  font-weight: bold;
}
.name {
  font-size: 18px;
  font-weight: 600;
}
.date {
  margin-top: 8px;
  opacity: 0.9;
  font-size: 14px;
}
.exam-empty {
  background: #f5f5f5;
  padding: 20px;
  border-radius: 12px;
  text-align: center;
  color: #999;
  margin-bottom: 20px;
}
</style>