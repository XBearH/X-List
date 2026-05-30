import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'
import { storage } from '../utils/storage'

export interface Exam {
  id: string
  name: string
  date: string
}

const EXAMS_KEY = 'x-todo-exams'

export const useUserStore = defineStore('user', () => {
  const currentRole = ref<'student' | 'worker'>('student')

  const savedExams = storage.get(EXAMS_KEY)
  const exams = ref<Exam[]>(Array.isArray(savedExams) ? savedExams : [])

  // 自动保存
  watch(exams, (val) => {
    storage.set(EXAMS_KEY, val)
  }, { deep: true })

  const addExam = (name: string, date: string) => {
    exams.value.push({ id: Date.now().toString(), name, date })
  }

  const removeExam = (id: string) => {
    exams.value = exams.value.filter(e => e.id !== id)
  }

  // 最近的未过期考试
  const nearestExam = computed(() => {
    if (exams.value.length === 0) return null
    const now = new Date().setHours(0, 0, 0, 0)
    const future = exams.value
      .filter(e => new Date(e.date).getTime() >= now)
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    return future[0] || null
  })

  return { currentRole, exams, addExam, removeExam, nearestExam }
})