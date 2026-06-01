import { defineStore } from 'pinia'
import { computed } from 'vue'
import { useTodoStore } from './todoStore'
import dayjs from 'dayjs'

export const useStatsStore = defineStore('stats', () => {
  const todoStore = useTodoStore()

  const completedTodos = computed(() => todoStore.completedTodos)

  // 本周每日完成数据（周一到周日）
  const weeklyData = computed(() => {
    const weekStart = dayjs().startOf('week')
    const days = Array.from({ length: 7 }, (_, i) => {
      const date = weekStart.add(i, 'day')
      const dateStr = date.format('YYYY-MM-DD')
      const dayTodos = completedTodos.value.filter(t =>
        dayjs(t.completedAt).format('YYYY-MM-DD') === dateStr
      )
      return {
        date: date.format('MM-DD'),
        fullDate: dateStr,
        count: dayTodos.length,
        items: dayTodos
      }
    })
    return days
  })

  // 本周总完成数
  const weeklyTotal = computed(() =>
    weeklyData.value.reduce((sum, d) => sum + d.count, 0)
  )

  // 完成时段分布（用于周总结分析效率）
  const hourDistribution = computed(() => {
    const dist = { morning: 0, afternoon: 0, evening: 0, night: 0 }
    completedTodos.value.forEach(t => {
      if (!t.completedAt) return
      const hour = dayjs(t.completedAt).hour()
      if (hour >= 9 && hour < 13) dist.morning++
      else if (hour >= 13 && hour < 19) dist.afternoon++
      else if (hour >= 19 && hour < 24) dist.evening++
      else dist.night++
    })
    return dist
  })

  // 角色完成占比
  const roleDistribution = computed(() => {
    const student = completedTodos.value.filter(t => t.role === 'student').length
    const worker = completedTodos.value.filter(t => t.role === 'worker').length
    return { student, worker, total: student + worker }
  })

  return { weeklyData, weeklyTotal, hourDistribution, roleDistribution }
})